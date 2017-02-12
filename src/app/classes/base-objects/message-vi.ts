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
    body_preview:string;
}
