import { Component, OnInit } from '@angular/core';
import {LoginService} from "../../../services/login.service";
import {WindowRef} from "../../../services/window-ref.service";

@Component({
  selector: 'app-register-user',
  templateUrl: 'register-user.component.html',
  providers: [LoginService, WindowRef]
})
export class RegisterUserComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
