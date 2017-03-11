import {BaseObject} from "./base-object";

export class NoteVi extends BaseObject {
  message: number;
  element: number;
  subject: string;
  body: string;
  private_note: boolean;
  owner: number;
  username: string;
  first_name: string;
  last_name: string;


  assign(obj: NoteVi): BaseObject {
    super.assign(obj);

    this.message = obj.message;
    this.element = obj.element;
    this.subject = obj.subject;
    this.body = obj.body;
    this.private_note = obj.private_note;
    this.owner = obj.owner;
    this.username = obj.username;
    this.first_name = obj.first_name;
    this.last_name = obj.last_name;

    return this;
  }
}
