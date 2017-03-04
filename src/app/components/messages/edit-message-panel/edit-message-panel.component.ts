import {Component, OnInit, EventEmitter, Output} from '@angular/core';
import {BasePanel} from "../../../classes/base-objects/base-panel";
import {TransportObject} from "../../../classes/base-objects/transport-object";
import {MessageVi} from "../../../classes/base-objects/message-vi";
import {WindowRef} from "../../../services/window-ref.service";
import {ElementsService} from "../../../services/elements.service";
import {MessagesService} from "../../../services/messages.service";
import {BaseObject} from "../../../classes/base-objects/base-object";

@Component({
  selector: 'edit-message-panel',
  templateUrl: './edit-message-panel.component.html',
  styleUrls: ['edit-message-panel.component.scss']
})

export class EditMessagePanelComponent extends BasePanel {

    @Output() onSaveNote = new EventEmitter<TransportObject>();
    currentMessage: MessageVi;
    editMode: boolean;

    getEventEmitter(): any {
        return this.onSaveNote;
    }

    constructor(public winRef: WindowRef,
                public elementService: ElementsService,
                private messageService: MessagesService) {

        super(winRef, elementService);
        this.currentMessage = new MessageVi();
    }

    getCurrentObject(): BaseObject {
        return this.currentMessage;
    }

    initDialog(note: MessageVi, edit: boolean): void {
        this.currentMessage = Object.assign({}, note);
        this.editMode = edit;
    }

    initComponent(): void {
        this.panelTemplate = document.querySelector("#editMessagePanelID");
    }

    onSaveNoteDialog(): void {

        this.currentMessage.subject = this.currentMessage.subject.trim();
        this.currentMessage.body = this.currentMessage.body.trim();

        // if (this.currentMessage.subject == null || this.currentMessage.subject == ' ' || this.currentMessage.subject.length == 0) {
        //     this.hasError = true;
        //     this.errorMessage = 'Заполните заголовок.';
        //     return;
        // }

        if (this.currentMessage.body == null || this.currentMessage.body == ' ' || this.currentMessage.body.length == 0) {
            this.hasError = true;
            this.errorMessage = 'Заполните содерание.';
            return;
        }

        this.inProcess = true;

        this.messageService.editMessage(this.currentMessage)
            .then((data) => {
                let trsObj = new TransportObject();
                trsObj.type = "Note";
                trsObj.object = (data as MessageVi);

                this.onSaveNote.emit(trsObj);

                this.currentMessage.subject = '';
                this.currentMessage.body = '';
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

}
