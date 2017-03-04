import {Component, OnInit, Output, Input, EventEmitter} from '@angular/core';
import {BasePanel} from "../../../classes/base-objects/base-panel";
import {ElementVi} from "../../../classes/base-objects/element-vi";
import {ElementsService} from "../../../services/elements.service";
import {WindowRef} from "../../../services/window-ref.service";
import {TransportObject} from "../../../classes/base-objects/transport-object";
import {BaseObject} from "../../../classes/base-objects/base-object";

@Component({
  selector: 'edit-element-panel',
  templateUrl: './edit-element-panel.component.html',
  styleUrls: ['edit-element-panel.component.scss']
})

export class EditElementPanelComponent extends BasePanel {

    @Input() editedElement: ElementVi;
    @Output() onEditElement = new EventEmitter<TransportObject>();

    getEventEmitter(): any {
        return this.onEditElement;
    }

    name: string;
    description: string;

    constructor(public elementService: ElementsService, public winRef: WindowRef) {
        super(winRef, elementService);
    }

    getCurrentObject(): BaseObject {
        return this.editedElement;
    }

    ngOnInit(): void {
        super.ngOnInit();

        if (this.editedElement != null) {
            this.name = this.editedElement.name;
            this.description = this.editedElement.description;
        }
    }

    onSaveElement(): void {
        this.name = this.name.trim();
        this.description = this.description.trim();

        if (this.name == null || this.name == ' ' || this.name.length == 0) {
            this.hasError = true;
            this.errorMessage = 'Заполните поле название.';
            return;
        }

        // if (this.description == null || this.description == ' ' || this.description.length == 0) {
        //     this.hasError = true;
        //     this.errorMessage = 'Заполните описание.';
        //     return;
        // }

        this.editedElement.name = this.name;
        this.editedElement.description = this.description;

        this.inProcess = true;

        this.elementService.editElement(this.editedElement)
            .then((data) => {

                let trsObj = new TransportObject();
                trsObj.type = "Element";
                trsObj.object = (data as ElementVi);

                this.onEditElement.emit(trsObj);

                this.name = '';
                this.description = '';
                this.errorMessage = '';
                this.hasError = false;
                this.inProcess = false;

                //Close panel
                this.panelInstance.dismiss();
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
        this.panelTemplate = document.querySelector("#editElementPanelID");
    }


    openPanel(): void {
        if (this.editedElement != null) {
            this.name = this.editedElement.name;
            this.description = this.editedElement.description;
        }
        super.openPanel();
    }
}
