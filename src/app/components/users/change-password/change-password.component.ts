import {Component, OnInit, AfterViewInit} from '@angular/core';
import {UserVi} from "../../../classes/base-objects/user-vi";
import {WindowRef} from "../../../services/window-ref.service";
import {ElementsService} from "../../../services/elements.service";
import {LoginService} from "../../../services/login.service";
import {Router} from "@angular/router";
import {BaseComponent} from "../../../classes/base-objects/base-component";

@Component({
  selector: 'change-password',
  templateUrl: './change-password.component.html',
  providers: [LoginService, WindowRef]
})
export class ChangePasswordComponent extends BaseComponent implements OnInit, AfterViewInit {

  currentUser: UserVi = new UserVi();
  finishEdit: boolean = false;

  constructor(public router: Router,
              private loginService: LoginService,
              private winRef: WindowRef) {
    super();
  }

  ngOnInit() {

    let token = localStorage.getItem('token');

    this.loginService.getCurrentUser(token).subscribe(
      response => {

        this.currentUser = response as UserVi;
      },
      error => {
        this.hasError = true;
        this.SetError(error);
      }
    );

  }

  ngAfterViewInit(): void {
    var CommandButtonElements = document.querySelectorAll(".ms-CommandButton");
    for (var i = 0; i < CommandButtonElements.length; i++) {
      new this.winRef.nativeWindow.fabric['CommandButton'](CommandButtonElements[i]);
    }

    var CommandBarElements = document.querySelectorAll(".ms-CommandBar");
    for (var i = 0; i < CommandBarElements.length; i++) {
      new this.winRef.nativeWindow.fabric['CommandBar'](CommandBarElements[i]);
    }

    var DropdownHTMLElements = document.querySelectorAll('.ms-Dropdown');
    for (var i = 0; i < DropdownHTMLElements.length; ++i) {
      var Dropdown = new this.winRef.nativeWindow.fabric['Dropdown'](DropdownHTMLElements[i]);
    }
  }

  change_password(event, password1, password2) {
    event.preventDefault();

    this.HideError();
    this.HideMessage();

    this.loginService.change_password(password1, password2, this.currentUser)
      .subscribe(
        response => {
          if (response.result){
            this.ShowMessage("Пароль был успешно изменен.");
            this.finishEdit = true;
          }

        },
        error => {
          this.hasError = true;
          this.SetError(error);
        }
      );
  }

}
