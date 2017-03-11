import {BaseObject} from "./base-object";

export class MessageVi extends BaseObject {
  element: number;
  subject: string;
  body: string;
  message_date: string;
  owner: number;
  username: string;
  first_name: string;
  last_name: string;
  message_type: string;
  body_preview: string;


  assign(obj: MessageVi): BaseObject {
    super.assign(obj);

    this.element = obj.element;
    this.subject = obj.subject;
    this.body = obj.body;
    this.message_date = obj.message_date;
    this.owner = obj.owner;
    this.username = obj.username;
    this.first_name = obj.first_name;
    this.last_name = obj.last_name;
    this.message_type = obj.message_type;
    this.body_preview = obj.body_preview;

    return this;
  }
}
