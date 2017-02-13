import {Component, OnInit, Input} from '@angular/core';
import {BaseDialog} from "../../../classes/base-objects/base-dialog";
import {ElementVi} from "../../../classes/base-objects/element-vi";
import {UserVi} from "../../../classes/base-objects/user-vi";
import {BaseObject} from "../../../classes/base-objects/base-object";
import {ElementsService} from "../../../services/elements.service";
import {WindowRef} from "../../../services/window-ref.service";
import {MembersService} from "../../../services/members.service";

@Component({
  selector: 'add-members-dialog',
  templateUrl: './add-member-dialog.component.html'
})

export class AddMemberDialogComponent extends BaseDialog {

  @Input() currentElement: ElementVi;
  membersList: UserVi[] = [];
  searchString: string = "";

  constructor(public elementService: ElementsService,
              public winRef: WindowRef,
              private memberService: MembersService) {
    super(winRef, elementService);
  }


  getCurrentObject(): BaseObject {
    return this.currentElement;
  }

  searchMembers(): void {

    if (!this.permission_denied && this.searchString.trim() != "") {
      this.inProcess = true;

      this.memberService.searchMembers(this.searchString)
        .then((retUsers) => {
          this.membersList = retUsers;
          this.inProcess = false;
        }).catch((error) => {
        this.SetError(error);
        this.inProcess = false;
      });
    }
  }

  addUser(addUser: UserVi): void {
    this.inProcess = true;
    this.memberService.addMember(this.currentElement.element, addUser)
      .then(() => {
        this.inProcess = false;

        var index = this.membersList.indexOf(addUser, 0);
        if (index > -1) {
          this.membersList.splice(index, 1);
        }
      }).catch((error) => {
      this.inProcess = false;
      this.SetError(error);
    });
  }

  initDialog(): void {
    this.membersList = [];
    this.searchString = "";
  }

  getEventEmitter(): any {
    return undefined;
  }

  initComponent(): void {
    let dialog = document.querySelector("#addMemberDialogID");//.querySelector(".ms-Dialog");
    this.dialogInstance = new this.winRef.nativeWindow.fabric['Dialog'](dialog);
  }
}
