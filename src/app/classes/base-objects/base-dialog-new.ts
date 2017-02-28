import {WindowRef} from "../../services/window-ref.service";
import {FormViHub} from "./form-vi-hub";
import {OnInit} from "@angular/core";

export abstract class BaseDialogNew extends FormViHub implements OnInit {
  constructor(protected winRef: WindowRef) {
    super();
  }

  inProcess: boolean = false;
  spinnerText: string = "Обработка запроса ...";

  dialogInstance: any;
  protected dialogID: string;

  ngOnInit(): void {
    let dialog = document.querySelector(this.dialogID);
    this.dialogInstance = new this.winRef.nativeWindow.fabric['Dialog'](dialog);
  }

  openDialog(): void {
    if (this.dialogInstance != null) {
      let i = 0;
      let dialogOpen: boolean = false;

      for (i; i < this.dialogInstance._dialog.classList.length; i++) {
        if (this.dialogInstance._dialog.classList[i] == "is-open") {
          dialogOpen = true;
        }
      }

      if (dialogOpen == false) {
        this.SetError(null);
        this.inProcess = false;
        this.dialogInstance.open();
      }
    }
  }

  closeDialog(): void {
    this.dialogInstance.close();
  }
}
