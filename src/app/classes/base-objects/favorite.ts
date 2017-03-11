import {ElementVi} from "./element-vi";


export class Favorite extends ElementVi {
  element_created_at: string;
  element_updated_at: string;
  element_owner: number;

  assign(elementIn: Favorite): Favorite {
    super.assign(elementIn);

    this.element_created_at = elementIn.element_created_at;
    this.element_updated_at = elementIn.element_updated_at;
    this.element_owner = elementIn.element_owner;

    return this;
  }
}
