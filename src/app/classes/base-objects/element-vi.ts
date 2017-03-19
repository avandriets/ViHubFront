import {BaseObject} from "./base-object";

function htmlToPlaintext(text) {
  return text ? String(text).replace(/<[^>]+>/gm, '') : '';
}

export class ElementVi extends BaseObject {
  element: number;
  parent: number;
  name: string;
  description: string;
  element_type: string;
  is_delete: number;
  is_favorite: boolean;
  owner: number;
  username: string;
  first_name: string;
  last_name: string;
  is_signal: boolean;

  assign(elementIn: ElementVi): ElementVi {
    super.assign(elementIn);

    this.element = elementIn.element;
    this.parent = elementIn.parent;
    this.name = elementIn.name;
    this.description = elementIn.description;
    this.element_type = elementIn.element_type;
    this.is_delete = elementIn.is_delete;
    this.is_favorite = elementIn.is_favorite;
    this.owner = elementIn.owner;
    this.username = elementIn.username;
    this.first_name = elementIn.first_name;
    this.last_name = elementIn.last_name;
    this.is_signal = elementIn.is_signal;

    return this;
  }

  //TODO make filter plain text
  public getShortDescription(): string {
    let templ = htmlToPlaintext(this.description);
    if (templ.length > 200) {
      templ = templ.substr(0, this.description.indexOf(" ", 200)) + " ...";
      return templ;
    }
    else
      return templ;
  }

  public getSignature(): string {
    let ss: string = "@";
    if (!this.first_name || !this.last_name || this.first_name.length == 0 || this.last_name.length == 0)
      return ss;
    ss = this.first_name.substr(0, 1).toUpperCase() + this.last_name.substr(0, 1).toUpperCase();
    return ss;
  }
}
