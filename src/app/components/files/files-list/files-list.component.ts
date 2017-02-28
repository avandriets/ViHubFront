import {Component, OnInit, Input, ViewChild} from '@angular/core';
import {FilesService} from "../../../services/files.service";
import {Router} from "@angular/router";
import {BaseObject} from "../../../classes/base-objects/base-object";
import {DeleteItemComponent} from "../../delete-item/delete-item.component";
import {ActionDeleteItem} from "../../../classes/base-objects/interfaces";
import {DialogActions} from "../../../classes/enums/dialog-actions.enum";

class BaseItemsList {
  @Input() protected itemsList: Array<BaseObject> = [];

  constructor() {
  }
}

@Component({
  selector: 'files-list',
  templateUrl: './files-list.component.html'
})
export class FilesListComponent extends BaseItemsList implements ActionDeleteItem {

  constructor(private filesService: FilesService, protected router: Router) {
    super();
  }

  @ViewChild(DeleteItemComponent) deleteItemDialog: DeleteItemComponent;

  onOpenDeleteItemDialog(deletedItem: BaseObject): void {
    this.deleteItemDialog.openDialog();
  }

  onActionDeleteDialog(action: DialogActions): void {
    if (action == DialogActions.Yes) {
      console.log("onActionDeleteDialog " + action);
      this.deleteItemDialog.closeDialog();
    } else {
      console.log("onActionDeleteDialog " + action);
    }
  }
}
