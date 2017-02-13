import {UserVi} from "../base-objects/user-vi";

export class Utils {

  //Constants
  public static siteName: string = "ViHub";

  //URLs
  public static baseURL: string = 'http://127.0.0.1:8000';
  public static OauthLoginEndPointUrl = Utils.baseURL + '/o/token/';
  public static meUserURL: string = Utils.baseURL + '/vi-hub/me';
  public static elementsUrl: string = Utils.baseURL + '/rest/elements/';
  public static favoriteUrl: string = Utils.baseURL + '/rest/element-favorite/';
  public static noteUrl: string = Utils.baseURL + '/rest/notes/';
  public static messageUrl: string = Utils.baseURL + '/rest/messages/';
  static searchUrl: string = Utils.baseURL + '/vi-hub/search-user/';

  static getCurrentUser(): UserVi{
    let currUser: UserVi = JSON.parse(localStorage.getItem('user')) as UserVi;
    return currUser;
  }
}

export function isLoggedin() {
  return !!localStorage.getItem('token');
}
