import {Component, OnInit, Input, ViewChild} from '@angular/core';
import {FilesService} from "../../../services/files.service";
import {Router} from "@angular/router";
import {BaseObject} from "../../../classes/base-objects/base-object";
import {DeleteItemComponent} from "../../delete-item/delete-item.component";
import {ActionDeleteItem} from "../../../classes/base-objects/interfaces";
import {DialogActions} from "../../../classes/enums/dialog-actions.enum";
import {Attachment} from "../../../classes/base-objects/attachment";
import {BaseItemsList} from "../../../classes/base-objects/base-items-list";


@Component({
  selector: 'files-list',
  templateUrl: './files-list.component.html',
  styleUrls: ['./files-list.component.scss']
})
export class FilesListComponent extends BaseItemsList<Attachment> implements ActionDeleteItem {

  currentFile: Attachment = null;

  constructor(private filesService: FilesService,
              protected router: Router) {
    super();
  }

  @ViewChild(DeleteItemComponent) deleteItemDialog: DeleteItemComponent;

  onOpenDeleteItemDialog(deletedItem: BaseObject): void {
    this.currentFile = deletedItem as Attachment;

    this.deleteItemDialog.openDialog();
  }

  isImage(item: Attachment): boolean {

    let arrayE: string[] = item.fileURL.split(".");
    let extension = arrayE[arrayE.length - 1];

    if (extension == 'jpg' || extension == 'bmp' || extension == 'png' || extension == 'jpeg' || extension == 'gif')
      return true;

    return false;
  }

  onActionDeleteDialog(action: DialogActions): void {
    if (action == DialogActions.Yes) {
      if (this.currentFile != null) {
        this.filesService.deleteAttachments(this.currentFile).subscribe(
          data => {
            this.deleteItemDialog.closeDialog();
            let index = this.itemsList.indexOf(this.currentFile, 0);
            if (index > -1) {
              this.itemsList.splice(index, 1);
            }
            this.currentFile = null;
          }, error => {
            this.hasError = true;
            this.SetError(error);

            this.deleteItemDialog.closeDialog();
            this.currentFile = null;
          }
        );
      }

    } else {
      //console.log("onActionDeleteDialog " + action);
    }
  }
}
