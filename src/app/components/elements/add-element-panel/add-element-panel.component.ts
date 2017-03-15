import {Component, Input, Output, EventEmitter, ViewChild} from '@angular/core';
import {ElementVi} from "../../../classes/base-objects/element-vi";
import {TransportObject} from "../../../classes/base-objects/transport-object";
import {ElementsService} from "../../../services/elements.service";
import {WindowRef} from "../../../services/window-ref.service";
import {BaseDialogNew} from "../../../classes/base-objects/base-dialog-new";
import {AddDialogItem} from "../../../classes/base-objects/interfaces";
import {SimpleTinyComponent} from "../../simple-tiny/simple-tiny.component";

interface AddItem{

}

@Component({
  selector: 'add-element-panel',
  templateUrl: 'add-element-panel.component.html',
  styleUrls: ['add-element-panel.component.scss']
})

export class AddElementPanelComponent extends BaseDialogNew implements AddDialogItem{

  @Input() parentElement: ElementVi;
  @Output() onDialogActionEvent = new EventEmitter<TransportObject>();

  name: string = '';
  description: string = '';
  element_type: any;
  modelTypes: Object[] =
    [
      {id: 'W', name: 'Workflow'},
      {id: 'K', name: 'Wiki'},
      {id: 'H', name: 'White board'}
    ];

  constructor(public elementService: ElementsService, public winRef: WindowRef) {
    super(winRef);
    this.spinnerText = "Сохраенение элемента ...";
  }

  getDialogID(): string {
    return "#addElementPanelID";
  }

  onSaveClick(): void {
    this.name = this.name.trim();
    this.description = this.description.trim();

    if (this.name == null || this.name == ' ' || this.name.length == 0) {
      this.hasError = true;
      this.errorMessage = 'Заполните поле название.';
      return;
    }

    if (this.element_type == null) {
      this.element_type = 'W';
    }

    if (this.element_type == null) {
      this.hasError = true;
      this.errorMessage = 'Укажите тип элемента.';
      return;
    }

    this.inProcess = true;

    this.elementService.createElement(this.name, this.description, this.element_type, this.parentElement)
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
      })
      .catch((error) => {
        this.errorMessage = error;
        this.hasError = true;
        this.inProcess = false;
      });
  }

  onCancelClick():void{
  }

  keyUpHandlerFunction(content: string): void {
    this.description = content;
  }
}
