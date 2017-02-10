import {UserVi} from "../base-objects/user-vi";

export class Utils {

  //URLs
  public static baseURL: string = 'http://127.0.0.1:8000';
  public static OauthLoginEndPointUrl = Utils.baseURL + '/o/token/';
  public static getCurrentUserURL: string = Utils.baseURL + '/vi-hub/me';

  static getCurrentUser(): UserVi{
    let currUser: UserVi = JSON.parse(localStorage.getItem('user')) as UserVi;

    return currUser;
  }
}

export function isLoggedin() {
  return !!localStorage.getItem('token');
}
