import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {BasePanel} from "../../../classes/base-objects/base-panel";
import {ElementVi} from "../../../classes/base-objects/element-vi";
import {TransportObject} from "../../../classes/base-objects/transport-object";
import {ElementsService} from "../../../services/elements.service";
import {WindowRef} from "../../../services/window-ref.service";
import {BaseObject} from "../../../classes/base-objects/base-object";
import {BaseDialogNew} from "../../../classes/base-objects/base-dialog-new";

@Component({
  selector: 'add-element-panel',
  templateUrl: 'add-element-panel.component.html',
  styleUrls: ['add-element-panel.component.scss']
})

export class AddElementPanelComponent extends BaseDialogNew {

  @Input() parentElement: ElementVi;
  @Output() onAddElement = new EventEmitter<TransportObject>();

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
    this.dialogID = "#addElementPanelID";
  }

  getEventEmitter(): any {
    return this.onAddElement;
  }

  check_permission(): void {
  }

  getCurrentObject(): BaseObject {
    return undefined;
  }

  doChangeDescription():void{

  }

  onCreateElement(): void {
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

        this.onAddElement.emit(trsObj);

        this.name = '';
        this.description = '';
        this.errorMessage = '';
        this.hasError = false;

        this.inProcess = false;

        //Close panel
        this.closeDialog();
        // this.panelInstance.dismiss();
      })
      .catch((error) => {
        this.errorMessage = error;
        this.hasError = true;
        this.inProcess = false;
      });
  }
}
