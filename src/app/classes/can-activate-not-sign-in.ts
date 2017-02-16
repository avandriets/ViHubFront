import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';

@Injectable()
export class CanActivateNotSignIn implements CanActivate {

  constructor(public router: Router) {
  }

  canActivate() {

    if (localStorage.getItem("token") != null) {
      this.router.navigateByUrl('/dashboard');
    }

    return (localStorage.getItem("token") == null);
    //return false;
  }

}
