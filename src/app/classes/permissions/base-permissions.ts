import {UserVi} from "../base-objects/user-vi";

export abstract class BasePermissions {
    abstract has_object_permission(obj: any, user: UserVi): boolean;
}
