import {Component, OnInit, AfterViewInit} from '@angular/core';
import {UserVi} from "../../classes/base-objects/user-vi";
import {Utils} from "../../classes/utility/utils";
import {LoginService} from "../../services/login.service";
import {Router} from "@angular/router";
import {WindowRef} from "../../services/window-ref.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: 'dashboard.component.html',
  styleUrls: ['dashboard.component.css'],
  providers: [LoginService, WindowRef]
})

export class DashboardComponent implements OnInit, AfterViewInit {

  private user: UserVi;
  private first_name: string;
  private last_name: string;
  private email: string;


  constructor(public router: Router, private loginService: LoginService, private winRef: WindowRef) {
  }

  ngOnInit() {
    this.user = Utils.getCurrentUser();

    if (this.user) {
      this.first_name = this.user.first_name;
      this.last_name = this.user.last_name;
      this.email = this.user.email;
    }
    else {
      this.router.navigateByUrl('/login');
    }

  }

  ngAfterViewInit(): void {

    var CommandBarElements = document.querySelectorAll(".ms-CommandBar");
    for (var i = 0; i < CommandBarElements.length; i++) {
      new this.winRef.nativeWindow.fabric['CommandBar'](CommandBarElements[i]);
    }

    var CommandButtonElements = document.querySelectorAll(".ms-CommandButton");
    for (var i = 0; i < CommandButtonElements.length; i++) {
      new this.winRef.nativeWindow.fabric['CommandButton'](CommandButtonElements[i]);
    }

    var DropdownHTMLElements = document.querySelectorAll('.ms-Dropdown');
    for (var i = 0; i < DropdownHTMLElements.length; ++i) {
      var Dropdown = new this.winRef.nativeWindow.fabric['Dropdown'](DropdownHTMLElements[i]);
    }
  }

}
