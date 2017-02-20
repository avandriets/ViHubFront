import {Component, OnInit, AfterViewInit} from '@angular/core';
import {Router} from "@angular/router";
import {LoginService} from "../../../services/login.service";
import {WindowRef} from "../../../services/window-ref.service";
import {ElementsService} from "../../../services/elements.service";
import {UserVi} from "../../../classes/base-objects/user-vi";
import {Utils} from "../../../classes/utility/utils";
import {RequestOptions, Headers} from "@angular/http";

@Component({
  selector: 'edit-profile',
  templateUrl: './edit-profile.component.html',
  providers: [LoginService, WindowRef, ElementsService]
})
export class EditProfileComponent implements OnInit, AfterViewInit {

  hasError: boolean = false;
  errorMessage: string = '';

  constructor(public router: Router,
              private loginService: LoginService,
              private elementService: ElementsService,
              private winRef: WindowRef) {
  }

  currentUser: UserVi = new UserVi();

  save_profile(event, username, first_name, last_name) {
    event.preventDefault();

    this.loginService.save_profile(username, first_name, last_name, this.currentUser)
      .subscribe(
        response => {

        },
        error => {
          this.hasError = true;
          this.SetError(error);
        }
      );
  }

  ngOnInit() {

    let token = localStorage.getItem('token');

    this.loginService.getCurrentUser(token).subscribe(
      response => {

        this.currentUser = response as UserVi;
        // localStorage.setItem('user', JSON.stringify(response));
        // this.router.navigateByUrl('/dashboard');
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

  SetError(error: any): void {
    if (error != null) {
      this.hasError = true;

      try {
        let error_detail = JSON.parse(error);
        if (error_detail.error_description) {
          this.errorMessage = error_detail.error_description;
        } else {
          this.errorMessage = "Ошибка " + error;
        }
      } catch (e) {
        this.errorMessage = "Ошибка сервера";
      }

    } else {
      this.hasError = false;
    }
  }

}
