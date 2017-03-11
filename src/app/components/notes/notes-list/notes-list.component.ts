import {Component, OnInit, Input} from '@angular/core';
import {NoteVi} from "../../../classes/base-objects/note-vi";
import {EditNoteDialogComponent} from "../edit-note-dialog/edit-note-dialog.component";
import {DeleteNoteDialogComponent} from "../delete-note-dialog/delete-note-dialog.component";
import {ElementsService} from "../../../services/elements.service";
import {Router} from "@angular/router";
import {BaseItemsList} from "../../../classes/base-objects/base-items-list";

@Component({
  selector: 'notes-list',
  templateUrl: './notes-list.component.html'
})

export class NotesListComponent extends BaseItemsList<NoteVi>{

    error: any;
    @Input() editNoteDialog: EditNoteDialogComponent;
    @Input() deleteNoteDialog: DeleteNoteDialogComponent;

    constructor(private elementService: ElementsService, private router: Router) {
      super();
    }

    onViewNoteClick(currentNote: NoteVi): void {
        this.editNoteDialog.initDialog(currentNote, false);
        this.editNoteDialog.openPanel();
    }

    onEditNoteClick(currentNote: NoteVi): void {
        this.editNoteDialog.initDialog(currentNote, true);
        this.editNoteDialog.openPanel();
    }

    onDeleteNoteClick(currentNote: NoteVi): void {
        this.deleteNoteDialog.initDialog(currentNote);
        this.deleteNoteDialog.openDialog();
    }
}
