import {BaseObject} from "./base-object";
import {FormViHub} from "./form-vi-hub";
import {Input} from "@angular/core";

export class BaseItemsList extends FormViHub {
  @Input() protected itemsList: Array<BaseObject> = [];

  constructor() {
    super();
  }
}
