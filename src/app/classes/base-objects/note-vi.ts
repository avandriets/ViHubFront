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
}
