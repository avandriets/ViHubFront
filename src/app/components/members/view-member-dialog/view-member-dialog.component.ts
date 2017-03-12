import {Component, OnInit, Input} from '@angular/core';
import {BaseDialog} from "../../../classes/base-objects/base-dialog";
import {ElementVi} from "../../../classes/base-objects/element-vi";
import {UserVi} from "../../../classes/base-objects/user-vi";
import {BaseObject} from "../../../classes/base-objects/base-object";
import {ElementsService} from "../../../services/elements.service";
import {WindowRef} from "../../../services/window-ref.service";
import {MembersService} from "../../../services/members.service";
import {BasePanel} from "../../../classes/base-objects/base-panel";

@Component({
  selector: 'view-members-dialog',
  templateUrl: './view-member-dialog.component.html'
})

export class ViewMemberDialogComponent extends BasePanel {

  @Input() currentElement: ElementVi;
  membersList: UserVi[] = [];

  foundMembersList: UserVi[] = [];
  searchString: string = "";


  constructor(public elementService: ElementsService,
              public winRef: WindowRef,
              private memberService: MembersService) {
    super(winRef, elementService);
  }

  openPanel(): void {
    super.openPanel();
    this.getMembers();
  }

  check_permission(): void {
    //return true;
  }

  getCurrentObject(): BaseObject {
    return this.currentElement;
  }

  getMembers(): void {
    this.memberService.getMembers(this.currentElement.element)
      .then((retUsers) => {
        this.membersList = retUsers;
      }).catch((error) => {
      this.SetError(error);
    });
  }

  deleteUser(deletedUser: UserVi): void {
    this.memberService.deleteMember(this.currentElement.element, deletedUser)
      .then(() => {
        var index = this.membersList.indexOf(deletedUser, 0);
        if (index > -1) {
          this.membersList.splice(index, 1);
        }
      }).catch((error) => {
      this.SetError(error);
    });
  }

  searchMembers(): void {

    if (!this.permission_denied && this.searchString.trim() != "") {
      this.inProcess = true;

      this.memberService.searchMembers(this.searchString)
        .then((retUsers) => {
          this.foundMembersList = retUsers;
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

        var index = this.foundMembersList.indexOf(addUser, 0);
        if (index > -1) {
          this.foundMembersList.splice(index, 1);
          this.getMembers();
        }
      }).catch((error) => {
      this.inProcess = false;
      this.SetError(error);
    });
  }

  getEventEmitter(): any {
    return undefined;
  }

  initComponent(): void {
    this.panelTemplate = document.querySelector("#MembersPanelID");
  }

}

// export class ViewMemberDialogComponent extends BaseDialog {
//
//   @Input() currentElement: ElementVi;
//   membersList: UserVi[] = [];
//
//   constructor(public elementService: ElementsService,
//               public winRef: WindowRef,
//               private memberService: MembersService) {
//     super(winRef, elementService);
//   }
//
//   getCurrentObject(): BaseObject {
//     return this.currentElement;
//   }
//
//   getMembers(): void {
//     this.memberService.getMembers(this.currentElement.element)
//       .then((retUsers) => {
//         this.membersList = retUsers;
//       }).catch((error) => {
//       this.SetError(error);
//     });
//   }
//
//   deleteUser(deletedUser: UserVi): void {
//     this.memberService.deleteMember(this.currentElement.element, deletedUser)
//       .then(() => {
//         //delete this.membersList[deletedUser];
//         var index = this.membersList.indexOf(deletedUser, 0);
//         if (index > -1) {
//           this.membersList.splice(index, 1);
//         }
//       }).catch((error) => {
//       this.SetError(error);
//     });
//   }
//
//   getEventEmitter(): any {
//     return undefined;
//   }
//
//   initDialog(): void {
//     this.getMembers();
//   }
//
//   initComponent(): void {
//     let dialog = document.querySelector("#ViewMemberDialogID");//.querySelector(".ms-Dialog");
//     this.dialogInstance = new this.winRef.nativeWindow.fabric['Dialog'](dialog);
//   }
//
//   openDialog(): void {
//     super.openDialog();
//     this.SetError(null);
//   }
// }
