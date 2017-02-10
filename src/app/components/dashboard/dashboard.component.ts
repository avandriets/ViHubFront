import {Component, OnInit, AfterViewInit} from '@angular/core';
import {UserVi} from "../../classes/base-objects/user-vi";
import {Utils} from "../../classes/utility/utils";
import {LoginService} from "../../services/login.service";
import {Router} from "@angular/router";
import {WindowRef} from "../../services/window-ref.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: 'dashboard.component.html',
  providers: [LoginService, WindowRef]
})

export class DashboardComponent implements OnInit {

  private user: UserVi;
  private first_name: string;
  private last_name: string;
  private email: string;

  constructor(public router: Router, private loginService: LoginService, private winRef: WindowRef) {

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

}
