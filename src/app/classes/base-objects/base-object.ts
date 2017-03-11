export class BaseObject {
  id: number;
  created_at: string;
  updated_at: string;

  assign(obj: BaseObject): BaseObject {
    this.id = obj.id;
    this.created_at = obj.created_at;
    this.updated_at = obj.updated_at;
    return this;
  }

  public static createFromJSONObject(obj: BaseObject): BaseObject {
    return new this().assign(obj);
  }

  public static createFromJsonArray(obj: BaseObject[]): BaseObject[] {
    let arrayL: Array<BaseObject> = [];
    for (let i = 0; i < obj.length; i++) {
      arrayL.push(this.createFromJSONObject(obj[i]));
    }
    return arrayL;
  }
}

