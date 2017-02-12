import {Component, OnInit, AfterViewInit} from '@angular/core';
import {WindowRef} from "../../services/window-ref.service";
import {LoginService} from "../../services/login.service";
import {UserVi} from "../../classes/base-objects/user-vi";
import {Utils} from "../../classes/utility/utils";
import {Router} from "@angular/router";

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  providers: [WindowRef]
})
export class NavigationBarComponent implements OnInit, AfterViewInit {

  private user: UserVi;
  private first_name: string;
  private last_name: string;
  private email: string;


  constructor(public router: Router,private winRef: WindowRef) {
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

  ngOnInit() {
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

    // var DropdownHTMLElements = document.querySelectorAll('.ms-Dropdown');
    // for (var i = 0; i < DropdownHTMLElements.length; ++i) {
    //   var Dropdown = new this.winRef.nativeWindow.fabric['Dropdown'](DropdownHTMLElements[i]);
    // }
  }

}
