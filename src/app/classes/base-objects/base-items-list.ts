import {BaseObject} from "./base-object";
import {FormViHub} from "./form-vi-hub";
import {Input} from "@angular/core";

export class BaseItemsList<T extends BaseObject> extends FormViHub {
  @Input() protected itemsList: Array<T> = [];

  constructor() {
    super();
  }
}
