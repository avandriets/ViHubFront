import {Injectable} from '@angular/core';
import {Http, URLSearchParams, Response, Headers, RequestOptions} from '@angular/http';
import {Observable} from 'rxjs/Rx';


@Injectable()
export class LoginService {
  private OauthLoginEndPointUrl = 'http://127.0.0.1:8000/o/token/';  // Oauth Login EndPointUrl to web API
  private clientId = 'Z7Oj673sDxuuBsMrjWhAWjYrSsjAwd9DrvXjlvRA';
  private clientSecret = 'AHXWlxNobhoeXNekCj6snTzMsVKRJ5DKqfNHOIdab9lf7xuUZqZxNvYfTJTlvvK8nCjUtUISDa29x5wFH0pqfrLrMGDl2x4H1x7JftmnXajMZ5O75PbOEBGNJFPZG9ER';

  constructor(public http: Http) {
  }

  // login(username, password): Promise<any> {
  //
  //   const url = this.OauthLoginEndPointUrl;
  //
  //   let params: URLSearchParams = new URLSearchParams();
  //   params.set('username', username);
  //   params.set('password', password);
  //   params.set('grant_type', 'password');
  //
  //   let headers = new Headers(
  //     {
  //       'Content-Type': 'application/json',
  //       'Accept': '*/*',
  //       'Access-Control-Allow-Origin': '*'
  //     }
  //   );
  //
  //   headers.append('Authorization', 'Basic ' + btoa(this.clientId + ':' + this.clientSecret));
  //   let options = new RequestOptions({headers: headers});
  //
  //
  //   return this.http
  //     .post(url, params, options)
  //     .toPromise()
  //     .then(res => res.json())
  //     .catch(this.handleError);
  // }

  login(username, password): Observable<any> {

    let headers = new Headers(
      {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept': '*/*',
        // 'Access-Control-Allow-Origin': '*'
      }
    );

    headers.append('Authorization', 'Basic ' + btoa(this.clientId+':'+this.clientSecret));

    let options = new RequestOptions({ headers: headers });

    let params: URLSearchParams = new URLSearchParams();
    params.set('username', username);
    params.set('password', password);
    // params.set('client_id', this.clientId);
    // params.set('client_secret', this.clientSecret);
    params.set('grant_type', 'password');

    return this.http.post(
      this.OauthLoginEndPointUrl,
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
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg); // log to console instead
    return Observable.throw(errMsg);
  }

  public logout() {
    localStorage.removeItem('token');
  }
}
