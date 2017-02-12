import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import {BaseDialog} from "../../../classes/base-objects/base-dialog";
import {NoteVi} from "../../../classes/base-objects/note-vi";
import {ElementsService} from "../../../services/elements.service";
import {WindowRef} from "../../../services/window-ref.service";
import {TransportObject} from "../../../classes/base-objects/transport-object";
import {BaseObject} from "../../../classes/base-objects/base-object";
import {NotesService} from "../../../services/notes.service";

@Component({
  selector: 'delete-note-dialog',
  templateUrl: './delete-note-dialog.component.html'
})

export class DeleteNoteDialogComponent extends BaseDialog {

    @Output() onDeleteNote = new EventEmitter<TransportObject>();
    currentNote: NoteVi;

    getEventEmitter(): any {
        return this.onDeleteNote;
    }

    constructor(public elementService: ElementsService,
                public winRef: WindowRef,
                private noteService: NotesService) {

        super(winRef, elementService);
        this.currentNote = new NoteVi();
    }

    getCurrentObject(): BaseObject {
        return this.currentNote;
    }

    initDialog(note: NoteVi): void {
        this.currentNote = Object.assign({}, note);
    }

    initComponent(): void {
        let dialog = document.querySelector("#deleteNoteDialogID");
        this.dialogInstance = new this.winRef.nativeWindow.fabric['Dialog'](dialog);
    }

    onDeleteNoteDialog(): void {
        this.inProcess = true;

        this.noteService.deleteNote(this.currentNote)
            .then((data) => {
                let trsObj = new TransportObject();
                trsObj.type = "Note";
                trsObj.object = (data as NoteVi);

                this.onDeleteNote.emit(trsObj);

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
