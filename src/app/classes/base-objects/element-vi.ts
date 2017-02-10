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
}
