import {Component, OnInit, EventEmitter, Output} from '@angular/core';
import {BaseDialog} from "../../../classes/base-objects/base-dialog";
import {TransportObject} from "../../../classes/base-objects/transport-object";
import {MessageVi} from "../../../classes/base-objects/message-vi";
import {WindowRef} from "../../../services/window-ref.service";
import {ElementsService} from "../../../services/elements.service";
import {BaseObject} from "../../../classes/base-objects/base-object";
import {MessagesService} from "../../../services/messages.service";

@Component({
  selector: 'delete-message-dialog',
  templateUrl: './delete-message-dialog.component.html'
})

export class DeleteMessageDialogComponent extends BaseDialog {

  @Output() onDeleteMessage = new EventEmitter<TransportObject>();
  currentNote: MessageVi;

  getEventEmitter(): any {
    return this.onDeleteMessage;
  }

  constructor(public elementService: ElementsService,
              public winRef: WindowRef,
              private messageService: MessagesService) {

    super(winRef, elementService);
    this.currentNote = new MessageVi();

  }

  getCurrentObject(): BaseObject {
    return this.currentNote;
  }

  initDialog(note: MessageVi): void {
    this.currentNote = Object.assign({}, note);
  }

  initComponent(): void {
    let dialog = document.querySelector("#deleteMessageDialogID");
    this.dialogInstance = new this.winRef.nativeWindow.fabric['Dialog'](dialog);
  }

  onDeleteMessageDialog(): void {
    this.inProcess = true;

    this.messageService.deleteMessage(this.currentNote)
      .then((data) => {
        let trsObj = new TransportObject();
        trsObj.type = "Note";
        trsObj.object = (data as MessageVi);

        this.onDeleteMessage.emit(trsObj);

        this.errorMessage = '';
        this.hasError = false;

        this.inProcess = false;

        this.closeDialog();
      })
      .catch((error) => {
        this.errorMessage = error;
        if (error.json().detail)
          this.errorMessage = error.json().detail;

        this.hasError = true;

        this.inProcess = false;
      });
  }
}
