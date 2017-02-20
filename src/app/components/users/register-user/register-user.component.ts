import {Component, OnInit} from '@angular/core';
import {LoginService} from "../../../services/login.service";
import {WindowRef} from "../../../services/window-ref.service";
import {Router} from "@angular/router";
import {LoginComponent} from "../login/login.component";

@Component({
  selector: 'app-register-user',
  templateUrl: 'register-user.component.html',
  providers: [LoginService, WindowRef]
})
export class RegisterUserComponent implements OnInit {

  hasError: boolean = false;
  errorMessage: string = '';

  constructor(public router: Router, private loginService: LoginService) {
  }

  ngOnInit() {
  }

  register(event, email_address, first_name, last_name, password1, password2) {
    event.preventDefault();

    this.loginService.register(email_address, first_name, last_name, password1, password2)
      .subscribe(
        response => {
          if (response.result)
            this.loginToSite(email_address, password1);
        },
        error => {
          this.hasError = true;
          this.SetError(error);
        }
      );
  }

  loginToSite(username: string, password: string) {

    this.loginService.login(username, password)
      .subscribe(
        response => {
          localStorage.setItem('token', response.access_token);
          this.getCurrentUser(response.access_token);
        },
        error => {
          this.hasError = true;
          this.SetError(error);
        }
      );
  }

  getCurrentUser(token): void {

    this.loginService.getCurrentUser(token).subscribe(
      response => {
        localStorage.setItem('user', JSON.stringify(response));
        this.router.navigateByUrl('/dashboard');
      },
      error => {
        this.hasError = true;
        this.SetError(error);
      }
    );

  }

  SetError(error: any): void {

    console.log(error);

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
