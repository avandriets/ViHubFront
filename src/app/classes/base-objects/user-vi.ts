import {BaseObject} from "./base-object";


export class UserVi extends BaseObject {
  first_name: string;
  last_name: string;
  email: string;
  provider: string;

  assign(obj: UserVi): BaseObject {
    super.assign(obj);

    this.first_name = obj.first_name;
    this.last_name = obj.last_name;
    this.email = obj.email;
    this.provider = obj.provider;

    return this;
  }
}
