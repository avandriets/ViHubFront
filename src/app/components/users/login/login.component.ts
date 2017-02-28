import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Observable} from 'rxjs/Rx';
import {LoginService} from '../../../services/login.service';
import {Utils} from "../../../classes/utility/utils";

@Component({
  selector: 'vihub-login',
  templateUrl: 'login.component.html',
  providers: [LoginService]
})

export class LoginComponent implements OnInit {

  hasError: boolean = false;
  errorMessage: string = '';
  siteName: string = '';

  constructor(public router: Router, private loginService: LoginService) {
  }

  ngOnInit(): void {
    this.siteName = Utils.siteName;
  }

  //TODO add waiting screen that shows login process
  login(event, username, password) {
    event.preventDefault();

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
