import {BaseObject} from "./base-object";

export class Attachment extends BaseObject {
  element: number;
  description: string;
  fileURL: string;
  owner: number;
  username: string;
  first_name: string;
  last_name: string;

  assign(obj: Attachment): BaseObject {
    super.assign(obj)

    this.element = obj.element;
    this.description = obj.description;
    this.fileURL = obj.fileURL;
    this.owner = obj.owner;
    this.username = obj.username;
    this.first_name = obj.username;
    this.last_name = obj.last_name;

    return this;
  }
}
