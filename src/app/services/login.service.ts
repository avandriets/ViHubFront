import {Injectable} from '@angular/core';
import {Http, URLSearchParams, Response, Headers, RequestOptions} from '@angular/http';
import {Observable} from 'rxjs/Rx';
import {Utils} from "../classes/utility/utils";
import {UserVi} from "../classes/base-objects/user-vi";


@Injectable()
export class LoginService {

  private key1 = 'Z7Oj673sDxuuBsMrjWhAWjYrSsjAwd9DrvXjlvRA';
  private key2 = 'AHXWlxNobhoeXNekCj6snTzMsVKRJ5DKqfNHOIdab9lf7xuUZqZxNvYfTJTlvvK8nCjUtUISDa29x5wFH0pqfrLrMGDl2x4H1x7JftmnXajMZ5O75PbOEBGNJFPZG9ER';

  constructor(public http: Http) {
  }

  login(username, password): Observable<any> {

    let headers = new Headers(
      {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept': '*/*',
      }
    );

    headers.append('Authorization', 'Basic ' + btoa(this.key1 + ':' + this.key2));

    let options = new RequestOptions({headers: headers});

    let params: URLSearchParams = new URLSearchParams();
    params.set('username', username);
    params.set('password', password);
    params.set('grant_type', 'password');

    return this.http.post(
      Utils.OauthLoginEndPointUrl,
      params,
      options
    ).map(this.handleData)
      .catch(this.handleError);
  }

  private handleData(res: Response) {
    let body = res.json();
    return body;
  }

  private handleError(error: any) {
    // In a real world app, we might use a remote logging infrastructure
    // We'd also dig deeper into the error to get a better message
    // let errMsg = (error.message) ? error.message :
    let errMsg = (error._body) ? error._body :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';

    console.error(errMsg); // log to console instead
    return Observable.throw(errMsg);
  }

  getCurrentUser(token): Observable<UserVi> {

    let headers = new Headers(
      {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept': '*/*',
        'Authorization': 'Bearer ' + token,
      }
    );

    let options = new RequestOptions({headers: headers});

    return this.http.get(Utils.getCurrentUserURL
      , options).map(this.handleUserData)
      .catch(this.handleError);

  }

  private handleUserData(res: Response) {
    let user = res.json() as UserVi;
    return user;
  }

  public logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }

}
