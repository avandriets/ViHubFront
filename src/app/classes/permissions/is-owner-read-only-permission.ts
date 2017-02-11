import {UserVi} from "../base-objects/user-vi";
import {BasePermissions} from "./base-permissions";

export class IsOwnerReadOnlyPermission extends BasePermissions {
    has_object_permission(obj: any, user: UserVi): boolean {

        if (obj.owner == user.id) {
            return true;
        } else {
            return false;
        }
    }
}
