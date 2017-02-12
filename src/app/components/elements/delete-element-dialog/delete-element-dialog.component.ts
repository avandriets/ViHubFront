import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {ElementVi} from "../../../classes/base-objects/element-vi";
import {BaseDialog} from "../../../classes/base-objects/base-dialog";
import {BaseObject} from "../../../classes/base-objects/base-object";
import {TransportObject} from "../../../classes/base-objects/transport-object";
import {ElementsService} from "../../../services/elements.service";
import {WindowRef} from "../../../services/window-ref.service";
import {Router} from "@angular/router";

@Component({
  selector: 'delete-element-dialog',
  templateUrl: './delete-element-dialog.component.html'
})

export class DeleteElementDialogComponent extends BaseDialog {
    @Input() deletedElement: ElementVi;
    @Output() onDeleteElement = new EventEmitter<TransportObject>();

    getEventEmitter(): any {
        return this.onDeleteElement;
    }

    getCurrentObject(): BaseObject {
        return this.deletedElement;
    }

    constructor(public elementService: ElementsService, public winRef: WindowRef, private router: Router) {
        super(winRef, elementService);
    }

    ngOnInit(): void {
        super.ngOnInit();
    }

    onDeleteElementClick(): void {

        this.inProcess = true;
        this.deletedElement.is_delete = 1;
        this.elementService.editElement(this.deletedElement)
            .then((data) => {

                let trsObj = new TransportObject();
                trsObj.type = "Element";
                trsObj.object = (data as ElementVi);

                this.onDeleteElement.emit(trsObj);

                this.errorMessage = '';
                this.hasError = false;

                this.inProcess = false;

                this.closeDialog();

                this.router.navigate(['/']);
            })
            .catch((error) => {

                this.errorMessage = error;
                if (error.json().detail)
                    this.errorMessage = error.json().detail;

                this.hasError = true;
                this.inProcess = false;
            });
    }

    initComponent(): void {
        let dialog = document.querySelector("#deleteDialogID");
        this.dialogInstance = new this.winRef.nativeWindow.fabric['Dialog'](dialog);
    }
}
