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

  public getSignature(): string {
    let ss: string = "@";
    if (!this.first_name || !this.last_name || this.first_name.length == 0 || this.last_name.length == 0)
      return ss;
    ss = this.first_name.substr(0, 1).toUpperCase() + this.last_name.substr(0, 1).toUpperCase();
    return ss;
  }
}
