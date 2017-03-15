import {UserVi} from "../base-objects/user-vi";
import {environment} from '../../../environments/environment';

export class Utils {

  //Constants
  public static siteName: string = "ViHub";

  //URLs
  public static elementsUrl: string = environment.hostUrl + '/rest/elements/';
  public static favoriteUrl: string = environment.hostUrl + '/rest/element-favorite/';
  public static noteUrl: string = environment.hostUrl + '/rest/notes/';
  public static messageUrl: string = environment.hostUrl + '/rest/messages/';
  public static searchUrl: string = environment.hostUrl + '/vi-hub/search-user/';
  public static attachmentUrl: string = environment.hostUrl + '/rest/attachments/';
  public static signalsURL: string = environment.hostUrl + '/vi-hub/get-signals';

  //Users urls
  public static OauthLoginEndPointUrl = environment.hostUrl + '/o/token/';
  public static UserURL: string = environment.hostUrl + '/rest/users/';
  public static meUserURL: string = environment.hostUrl + '/vi-hub/me';

  static getCurrentUser(): UserVi {
    let currUser: UserVi = JSON.parse(localStorage.getItem('user')) as UserVi;
    return currUser;
  }

  static getToken(): string {
    return localStorage.getItem('token');
  }
}
