import {Component, OnInit, Output, Input, EventEmitter, AfterViewInit, ViewChild} from '@angular/core';
import {BasePanel} from "../../../classes/base-objects/base-panel";
import {ElementVi} from "../../../classes/base-objects/element-vi";
import {ElementsService} from "../../../services/elements.service";
import {WindowRef} from "../../../services/window-ref.service";
import {TransportObject} from "../../../classes/base-objects/transport-object";
import {BaseObject} from "../../../classes/base-objects/base-object";
import {BaseDialogNew} from "../../../classes/base-objects/base-dialog-new";
import {AddDialogItem} from "../../../classes/base-objects/interfaces";
import {SimpleTinyComponent, tinymce} from "../../simple-tiny/simple-tiny.component";

@Component({
  selector: 'edit-element-panel',
  templateUrl: './edit-element-panel.component.html',
  styleUrls: ['edit-element-panel.component.scss']
})

export class EditElementPanelComponent extends BaseDialogNew implements AddDialogItem {

  @ViewChild(SimpleTinyComponent) HtmlEditor: SimpleTinyComponent;

  getDialogID(): string {
    return "#editElementPanelID";
  }

  onCancelClick(): void {
  }


  @Input() editedElement: ElementVi;
  @Output() onDialogActionEvent = new EventEmitter<TransportObject>();


  name: string;
  description: string;

  constructor(public elementService: ElementsService, public winRef: WindowRef) {
    super(winRef);
  }

  onSaveClick(): void {
    this.name = this.name.trim();
    this.description = this.description.trim();

    if (this.name == null || this.name == ' ' || this.name.length == 0) {
      this.hasError = true;
      this.errorMessage = 'Заполните поле название.';
      return;
    }

    this.editedElement.name = this.name;
    this.editedElement.description = this.description;

    this.inProcess = true;

    this.elementService.editElement(this.editedElement)
      .then((data) => {

        let trsObj = new TransportObject();
        trsObj.type = "Element";
        trsObj.object = (data as ElementVi);

        this.onDialogActionEvent.emit(trsObj);

        this.name = '';
        this.description = '';
        this.errorMessage = '';
        this.hasError = false;
        this.inProcess = false;

        //Close panel
        this.closeDialog();
        //this.panelInstance.dismiss();
      })
      .catch((error) => {
        this.errorMessage = error;
        if (error.json().detail)
          this.errorMessage = error.json().detail;

        this.hasError = true;
        this.inProcess = false;
      });
  }


  openDialog(): void {
    super.openDialog();
    this.initData();
  }

  initData(): void {
    if (this.editedElement != null) {
      this.name = this.editedElement.name;
      this.description = this.editedElement.description;
      this.HtmlEditor.setContent(this.description);
    }
  }

  keyUpHandlerFunction(content: string): void {
    this.description = content;
  }
}
