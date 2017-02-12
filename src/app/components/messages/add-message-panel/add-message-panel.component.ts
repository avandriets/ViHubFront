import {Component, OnInit, EventEmitter, Input, Output} from '@angular/core';
import {MessagesService} from "../../../services/messages.service";
import {WindowRef} from "../../../services/window-ref.service";
import {ElementsService} from "../../../services/elements.service";
import {BaseObject} from "../../../classes/base-objects/base-object";
import {BasePanel} from "../../../classes/base-objects/base-panel";
import {ElementVi} from "../../../classes/base-objects/element-vi";
import {TransportObject} from "../../../classes/base-objects/transport-object";
import {MessageVi} from "../../../classes/base-objects/message-vi";

@Component({
  selector: 'add-message-panel',
  templateUrl: './add-message-panel.component.html'
})

export class AddMessagePanelComponent extends BasePanel {

  @Input() parentElement: ElementVi;
  @Output() onAddMessage = new EventEmitter<TransportObject>();

  check_permission(): void {
    //return true;
  }

  getCurrentObject(): BaseObject {
    return undefined;
  }

  getEventEmitter(): any {
    return this.onAddMessage;
  }

  subject: string = '';
  message: string = '';

  constructor(public elementService: ElementsService,
              public winRef: WindowRef,
              private messageService: MessagesService) {
    super(winRef, elementService);
  }

  onCreateMessage(): void {
    this.subject = this.subject.trim();
    this.message = this.message.trim();

    // if(this.subject == null || this.subject == ' ' || this.subject.length == 0){
    //     this.hasError = true;
    //     this.errorMessage = 'Заполните поле тема.';
    //     return;
    // }

    if (this.message == null || this.message == ' ' || this.message.length == 0) {
      this.hasError = true;
      this.errorMessage = 'Заполните тело сообщения.';
      return;
    }

    let message = new MessageVi();
    message.subject = this.subject;
    message.body = this.message;
    message.element = this.parentElement.element;

    this.inProcess = true;

    this.messageService.createMessage(message)
      .then((data) => {
        let trsObj = new TransportObject();
        trsObj.type = "Message";
        trsObj.object = (data as MessageVi);

        this.onAddMessage.emit(trsObj);

        this.subject = '';
        this.message = '';
        this.errorMessage = '';
        this.hasError = false;

        this.inProcess = false;

        //Close panel
        this.panelInstance.dismiss();
      })
      .catch((error) => {
        this.errorMessage = error;
        this.hasError = true;

        this.inProcess = false;
      });
  }

  initComponent(): void {
    this.panelTemplate = document.querySelector("#addMessagePanelID");
  }
}
