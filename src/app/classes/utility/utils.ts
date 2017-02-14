import {UserVi} from "../base-objects/user-vi";
import { environment } from '../../../environments/environment';

export class Utils {

  //Constants
  public static siteName: string = "ViHub";

  //URLs

  //public static baseURL: string = 'http://127.0.0.1:8000';
  public static OauthLoginEndPointUrl = environment.hostUrl + '/o/token/';
  public static meUserURL: string = environment.hostUrl + '/vi-hub/me';
  public static elementsUrl: string = environment.hostUrl + '/rest/elements/';
  public static favoriteUrl: string = environment.hostUrl + '/rest/element-favorite/';
  public static noteUrl: string = environment.hostUrl + '/rest/notes/';
  public static messageUrl: string = environment.hostUrl + '/rest/messages/';
  static searchUrl: string = environment.hostUrl + '/vi-hub/search-user/';

  static getCurrentUser(): UserVi{
    let currUser: UserVi = JSON.parse(localStorage.getItem('user')) as UserVi;
    return currUser;
  }
}

export function isLoggedin() {
  return !!localStorage.getItem('token');
}
