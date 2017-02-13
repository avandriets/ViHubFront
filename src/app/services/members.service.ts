import {Injectable} from '@angular/core';
import {Http, Headers, URLSearchParams, RequestOptions} from "@angular/http";
import {UserVi} from "../classes/base-objects/user-vi";
import {Utils} from "../classes/utility/utils";

@Injectable()
export class MembersService {

  headers: Headers;

  constructor(private http: Http) {
    let token = localStorage.getItem('token');

    this.headers = new Headers(
      {
        'Content-Type': 'application/json',
        'Accept': '*/*',
        'Authorization': 'Bearer ' + token,
      }
    );
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }

  getMembers(element: number): Promise<UserVi[]> {
    const url = `${Utils.elementsUrl}${element}/get-members/`;

    return this.http
      .get(url, {headers: this.headers})
      .toPromise()
      .then((response) => {
        return response.json() as UserVi[];
      })
      .catch(this.handleError);
  }

  deleteMember(element: number, deletedUser: UserVi): Promise<UserVi> {
    const url = `${Utils.elementsUrl}${element}/delete-member/`;

    let member: string = deletedUser.id.toString();
    let params = new URLSearchParams();
    params.set('member', member); // the user's search value

    let options = new RequestOptions({headers: this.headers});
    options.search = params;


    return this.http
      .post(url, {member: member}, options)
      .toPromise()
      .then(res => res.json())
      .catch(this.handleError);
  }

  searchMembers(searchString: string): Promise<UserVi[]> {
    const url = Utils.searchUrl;

    // let params = new URLSearchParams();
    // params.set('search', searchString); // the user's search value

    let params = new URLSearchParams();
    params.set('search', searchString); // the user's search value

    let options = new RequestOptions({headers: this.headers});
    options.search = params;

    return this.http
      .get(Utils.searchUrl, options)
      .toPromise()
      .then(res => res.json())
      .catch(this.handleError);
  }

  addMember(element: number, addUser: UserVi): Promise<UserVi> {
    const url = `${Utils.elementsUrl}${element}/add-member/`;

    let member: string = addUser.id.toString();

    let params = new URLSearchParams();
    params.set('member', member); // the user's search value

    let options = new RequestOptions({headers: this.headers});
    options.search = params;

    return this.http
      .post(url, {member: member}, options)
      .toPromise()
      .then(res => res.json())
      .catch(this.handleError);
  }
}
