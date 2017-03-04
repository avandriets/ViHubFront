import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import {BasePanel} from "../../../classes/base-objects/base-panel";
import {TransportObject} from "../../../classes/base-objects/transport-object";
import {NoteVi} from "../../../classes/base-objects/note-vi";
import {WindowRef} from "../../../services/window-ref.service";
import {ElementsService} from "../../../services/elements.service";
import {BaseObject} from "../../../classes/base-objects/base-object";
import {NotesService} from "../../../services/notes.service";

@Component({
  selector: 'edit-note-dialog',
  templateUrl: './edit-note-dialog.component.html',
  styleUrls: ['edit-note-dialog.component.scss']

})

export class EditNoteDialogComponent extends BasePanel {

  @Output() onSaveNote = new EventEmitter<TransportObject>();
  currentNote: NoteVi;
  editMode: boolean;

  getEventEmitter(): any {
    return this.onSaveNote;
  }

  constructor(public winRef: WindowRef,
              public elementService: ElementsService,
              private noteService: NotesService) {

    super(winRef, elementService);
    this.currentNote = new NoteVi();
  }

  getCurrentObject(): BaseObject {
    return this.currentNote;
  }

  initDialog(note: NoteVi, edit: boolean): void {
    this.currentNote = Object.assign({}, note);
    this.editMode = edit;
  }

  initComponent(): void {
    this.panelTemplate = document.querySelector("#editNotePanelID");
  }

  onSaveNoteDialog(): void {

    this.currentNote.subject = this.currentNote.subject.trim();
    this.currentNote.body = this.currentNote.body.trim();

    // if (this.currentMessage.subject == null || this.currentMessage.subject == ' ' || this.currentMessage.subject.length == 0) {
    //     this.hasError = true;
    //     this.errorMessage = 'Заполните заголовок.';
    //     return;
    // }

    if (this.currentNote.body == null || this.currentNote.body == ' ' || this.currentNote.body.length == 0) {
      this.hasError = true;
      this.errorMessage = 'Заполните содерание.';
      return;
    }

    this.inProcess = true;

    this.noteService.editNote(this.currentNote)
      .then((data) => {
        let trsObj = new TransportObject();
        trsObj.type = "Note";
        trsObj.object = (data as NoteVi);

        this.onSaveNote.emit(trsObj);

        this.currentNote.subject = '';
        this.currentNote.body = '';
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
