import {BaseObject} from "./base-object";

export class Attachment extends BaseObject {
    element: number;
    description: string;
    fileURL: string;
    owner: number;
    username: string;
    first_name: string;
    last_name: string;
}
