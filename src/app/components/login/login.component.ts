import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {Observable} from 'rxjs/Rx';
import {LoginService} from '../../services/login.service';
import {Utils} from "../../classes/utility/utils";

@Component({
  selector: 'my-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [LoginService]
})
export class LoginComponent {

  hasError: boolean = false;
  errorMessage: string = '';

  constructor(public router: Router, private loginService: LoginService) {
  }

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

      let error_detail = JSON.parse(error);
      if (error_detail.error_description) {
        this.errorMessage = error_detail.error_description;
      } else {
        this.errorMessage = "Ошибка " + error;
      }

    } else {
      this.hasError = false;
    }
  }
}
