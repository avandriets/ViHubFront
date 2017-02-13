import {Component, OnInit, Input} from '@angular/core';
import {MessageVi} from "../../../classes/base-objects/message-vi";
import {ElementsService} from "../../../services/elements.service";
import {Router} from "@angular/router";
import {DeleteMessageDialogComponent} from "../delete-message-dialog/delete-message-dialog.component";
import {EditMessagePanelComponent} from "../edit-message-panel/edit-message-panel.component";
import {AddNotePanelComponent} from "../../notes/add-note-panel/add-note-panel.component";

@Component({
  selector: 'messages-list',
  templateUrl: './messages-list.component.html'
})

export class MessagesListComponent {

    error: any;
    @Input() localMessages: MessageVi[] = [];
    // @Input() viewMessageDialog: ViewMessageDialogComponent;
    @Input() addNoteDialogLocal: AddNotePanelComponent;
    @Input() editMessageDialog: EditMessagePanelComponent;
    @Input() deleteMessageDialog: DeleteMessageDialogComponent;

    constructor(private elementService: ElementsService, private router: Router) {
    }

    // onViewMessageClick(currentMessage: MessageVi): void {
    //
    //     this.viewMessageDialog.initDialog(currentMessage);
    //     this.viewMessageDialog.openDialog();
    // }

    onAddNoteClick(message: MessageVi): void {
        this.addNoteDialogLocal.initDialog(message);
        this.addNoteDialogLocal.openPanel();
    }

    onEditMessageClick(currentNote: MessageVi): void {
        this.editMessageDialog.initDialog(currentNote, true);
        this.editMessageDialog.openPanel();
    }

    onDeleteMessageClick(currentNote: MessageVi): void {
        this.deleteMessageDialog.initDialog(currentNote);
        this.deleteMessageDialog.openDialog();
    }
}
