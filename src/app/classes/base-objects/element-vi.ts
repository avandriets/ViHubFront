import {BaseObject} from "./base-object";

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

    return this;
  }

  public getShortDescription(): string {
    if (this.description.length > 200)
      return this.description.substr(0, this.description.indexOf(" ", 200)) + " ...";
    else
      return this.description;
  }
}
