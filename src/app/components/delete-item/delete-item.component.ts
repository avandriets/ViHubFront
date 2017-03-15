import {Component, OnInit, EventEmitter, Output} from '@angular/core';
import {WindowRef} from "../../services/window-ref.service";
import {DialogActions} from "../../classes/enums/dialog-actions.enum";
import {DeleteDialogItem} from "../../classes/base-objects/interfaces";
import {BaseDialogNew} from "../../classes/base-objects/base-dialog-new";


@Component({
  selector: 'delete-item',
  templateUrl: './delete-item.component.html'
})
export class DeleteItemComponent extends BaseDialogNew implements OnInit, DeleteDialogItem {
  getDialogID(): string {
    return "#deleteItemDialogID";
  }

  constructor(protected winRef: WindowRef) {
    super(winRef);
  }

  @Output() onDialogActionEvent = new EventEmitter<any>();

  onYesClick(): void {
    this.onDialogActionEvent.emit(DialogActions.Yes);
  }

  onNoClick(): void {
    this.onDialogActionEvent.emit(DialogActions.No);
  }
}
