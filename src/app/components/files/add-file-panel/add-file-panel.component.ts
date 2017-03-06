///<reference path="../../file-uploader/file-uploader.component.ts"/>
import {Component, OnInit, Input, Output, EventEmitter, ViewChild} from '@angular/core';
import {WindowRef} from "../../../services/window-ref.service";
import {BasePanelNew} from "../../../classes/base-objects/base-panel-new";
import {AddPanelItem} from "../../../classes/base-objects/interfaces";
import {FileUploaderComponent} from "../../file-uploader/file-uploader.component";

@Component({
  selector: 'add-file-panel',
  templateUrl: './add-file-panel.component.html',
  styleUrls: ['./add-file-panel.component.scss']
})
export class AddFilePanelComponent extends BasePanelNew implements OnInit, AddPanelItem {

  //@ViewChild("fileInput") fileInput;
  @ViewChild(FileUploaderComponent) fileUploader: FileUploaderComponent;


  @Output() AddFileEventEmitter = new EventEmitter<any>();

  description: string = '';

  constructor(protected winRef: WindowRef) {
    super(winRef);
    this.panelID = "#addFILEPanelID";
  }

  onSaveClick(): void {

    console.log(this.fileUploader.uploadedFile);

    let fileToUpload;
    //let fi = this.fileInput.nativeElement;

    if (this.fileUploader.uploadedFile) {
      fileToUpload = this.fileUploader.uploadedFile;
      let data = {file: fileToUpload, description: this.description};
      this.AddFileEventEmitter.emit(data);
    } else {
      this.SetError({detail: "Выберети файл"});
    }
    console.log(fileToUpload);
  }

  SetError(error: any): void {
    if (error != null) {
      this.hasError = true;
      if (error.detail) {
        this.errorMessage = error.detail;
      } else {
        this.errorMessage = "Ошибка";
      }

    } else {
      this.hasError = false;
    }
  }

  clean() {
    this.description = "";

    this.fileUploader.dragging = false;
    this.fileUploader.loaded = false;
    this.fileUploader.imageLoaded = false;
    this.fileUploader.imageSrc = '';
    this.fileUploader.iconColor = '';
    this.fileUploader.fileName = '';
    this.fileUploader.borderColor = '';
    this.fileUploader.uploadedFile = null;
    this.hasError = false;
  }
}
