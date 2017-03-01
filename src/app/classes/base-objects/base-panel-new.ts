import {WindowRef} from "../../services/window-ref.service";
import {FormViHub} from "./form-vi-hub";
import {OnInit} from "@angular/core";


export class BasePanelNew extends FormViHub implements OnInit {

  panelTemplate: any;
  panelInstance: any;
  panelID: string;

  constructor(protected winRef: WindowRef) {
    super();
  }

  ngOnInit(): void {
    this.panelTemplate = document.querySelector(this.panelID);
  }

  openPanel(): void {
    this.buildPanel();
  }

  buildPanel(): void {
    this.panelInstance = new this.winRef.nativeWindow.fabric['Panel'](this.panelTemplate);
  }

  closePanel() :void{
    this.inProcess = false;
    this.panelInstance.dismiss();
  }
}
