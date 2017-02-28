import {Component, OnInit, Input, Output, EventEmitter, ViewChild} from '@angular/core';
import {WindowRef} from "../../../services/window-ref.service";
import {BasePanelNew} from "../../../classes/base-objects/base-panel-new";
import {AddPanelItem} from "../../../classes/base-objects/interfaces";


@Component({
  selector: 'add-file-panel',
  templateUrl: './add-file-panel.component.html'
})
export class AddFilePanelComponent extends BasePanelNew implements OnInit, AddPanelItem {

  @ViewChild("fileInput") fileInput;
  @Output() AddFileEventEmitter = new EventEmitter<any>();

  description: string = '';

  constructor(protected winRef: WindowRef) {
    super(winRef);
    this.panelID = "#addFILEPanelID";
  }

  onSaveClick(): void {

    // let fi = this.fileInput.nativeElement;
    // if (fi.files && fi.files[0]) {
    //   let fileToUpload = fi.files[0];
    //
    //   let attach = new Attachment();
    //   attach.element = this.element.element;
    //   attach.description = "Hello from file";
    //
    //   this.fileService.uploadAttachment(attach, fileToUpload)
    //     .subscribe(
    //       data => console.log('success'),
    //       error => console.log(error)
    //     );
    // }

    let fileToUpload;
    let fi = this.fileInput.nativeElement;

    if (fi.files && fi.files[0]) {
      fileToUpload = fi.files[0];
      this.AddFileEventEmitter.emit(fileToUpload);
    }
    console.log(fileToUpload);
  }

}
