import {Component, OnInit, AfterViewInit, Input, Output, EventEmitter} from '@angular/core';
import {BasePanel} from "../../../classes/base-objects/base-panel";
import {BaseObject} from "../../../classes/base-objects/base-object";
import {ElementVi} from "../../../classes/base-objects/element-vi";
import {MessageVi} from "../../../classes/base-objects/message-vi";
import {ElementsService} from "../../../services/elements.service";
import {WindowRef} from "../../../services/window-ref.service";
import {TransportObject} from "../../../classes/base-objects/transport-object";
import {NoteVi} from "../../../classes/base-objects/note-vi";
import {NotesService} from "../../../services/notes.service";

@Component({
  selector: 'add-note-panel',
  templateUrl: './add-note-panel.component.html'
})

export class AddNotePanelComponent extends BasePanel implements AfterViewInit {

    getCurrentObject(): BaseObject {
        return undefined;
    }

    check_permission(): void {
        //super.check_permission();
    }

    @Input() parentElement: ElementVi;
    @Input() parentMessage: MessageVi;
    @Output() onAddNote = new EventEmitter<TransportObject>();

    getEventEmitter(): any {
        return this.onAddNote;
    }

    subject: string = '';
    message: string = '';
    private_note: boolean = false;

    constructor(public elementService: ElementsService,
                public winRef: WindowRef,
                private noteService: NotesService) {

        super(winRef, elementService);
    }

    onCreateNote(): void {
        this.subject = this.subject.trim();
        this.message = this.message.trim();

        // if (this.subject == null || this.subject == ' ' || this.subject.length == 0) {
        //     this.hasError = true;
        //     this.errorMessage = 'Заполните заголовок.';
        //     return;
        // }

        if (this.message == null || this.message == ' ' || this.message.length == 0) {
            this.hasError = true;
            this.errorMessage = 'Заполните содерание.';
            return;
        }

        let note = new NoteVi();
        note.subject = this.subject;
        note.body = this.message;
        note.element = this.parentElement.element;
        note.private_note = this.private_note;

        if (this.parentMessage != null) {
            note.message = this.parentMessage.id;
        }

        this.inProcess = true;

        this.noteService.createNote(note)
            .then((data) => {
                let trsObj = new TransportObject();
                trsObj.type = "Note";
                trsObj.object = (data as NoteVi);

                this.onAddNote.emit(trsObj);

                this.subject = '';
                this.message = '';
                this.parentMessage = null;

                this.errorMessage = '';
                this.hasError = false;

                this.inProcess = false;

                //Close panel
                this.panelInstance.dismiss();
            })
            .catch((error) => {
                this.SetError(error);
                // this.errorMessage = error;
                // this.hasError = true;

                this.inProcess = false;
            });
    }

    initDialog(pParentMessage: MessageVi): void {
        this.parentMessage = pParentMessage;
    }

    initComponent(): void {
        this.panelTemplate = document.querySelector("#addNotePanelID");
    }

    ngAfterViewInit(): void {
        var ToggleElements = document.querySelectorAll(".ms-Toggle");
        for (var i = 0; i < ToggleElements.length; i++) {
            new this.winRef.nativeWindow.fabric['Toggle'](ToggleElements[i]);
        }
    }
}
