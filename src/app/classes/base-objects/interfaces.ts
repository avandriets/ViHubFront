import {DeleteItemComponent} from "../../components/delete-item/delete-item.component";
import {BaseObject} from "./base-object";
import {DialogActions} from "../enums/dialog-actions.enum";
import {EventEmitter} from "@angular/core";
import {AddFilePanelComponent} from "../../components/files/add-file-panel/add-file-panel.component";

export interface EditItemInList {
  editItemDialog: EditItemBaseDialog;
  onEditItemHandler(editedItem: BaseObject): void;
}

export interface ActionDeleteItem {
  deleteItemDialog: DeleteItemComponent;
  onOpenDeleteItemDialog(deletedItem: BaseObject): void;
  onActionDeleteDialog(action: DialogActions): void;
}

export interface DeleteDialogItem{
  onDialogActionEvent: EventEmitter<any>;
  onYesClick(): void;
  onNoClick(): void;
}

export interface AddDialogItem{
  onDialogActionEvent: EventEmitter<any>;
  onSaveClick(): void;
  onCancelClick(): void;
}

export interface AddFileAction{
  addFilePanel: AddFilePanelComponent;
  openAddElement(): void;
  onActionAddFile(fileName: string): void;
}

export interface AddPanelItem{
  AddFileEventEmitter: EventEmitter<any>;
  onSaveClick(): void;
}
