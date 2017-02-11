import {Injectable} from '@angular/core';
import {ElementVi} from "../classes/base-objects/element-vi";
import {Utils} from "../classes/utility/utils";
import {URLSearchParams, Http, Headers, RequestOptions, Response} from "@angular/http";
import {Favorite} from "../classes/base-objects/favorite";
import {UserVi} from "../classes/base-objects/user-vi";
import {Observable} from "rxjs";
import {Router} from "@angular/router";


@Injectable()
export class ElementsService {

  headers: Headers;
  cardView: boolean = true;
  currentUser: UserVi;

  constructor(private http: Http, public router: Router) {

    let token = localStorage.getItem('token');

    this.headers = new Headers(
      {
        'Content-Type': 'application/json',
        'Accept': '*/*',
        'Authorization': 'Bearer ' + token,
      }
    );

    let options = new RequestOptions({headers: this.headers});

    this.http.get(Utils.meUserURL
      , options).map(this.handleUserData)
      .catch(this.handleUserDataError);
  }

  private handleUserData(res: Response) {
    this.currentUser = res.json() as UserVi;
  }

  private handleUserDataError(error: any) {
    // In a real world app, we might use a remote logging infrastructure
    // We'd also dig deeper into the error to get a better message
    // let errMsg = (error.message) ? error.message :
    // let errMsg = (error._body) ? error._body :
    if (error.status == 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      this.router.navigateByUrl('/login');
      return;
    }

    let errMsg = error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg); // log to console instead
    return Observable.throw(errMsg);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }

  getElementById(id: number): Promise<ElementVi> {

    const url = `${Utils.elementsUrl}${id}/`;

    return this.http
      .get(url)
      .toPromise()
      .then((response) => {

        return (response.json() as ElementVi);
      })
      .catch(this.handleError);
  }

  getElements(parent: number): Promise<ElementVi[]> {

    let parent_param: string = "-1";
    if (parent != null) {
      parent_param = parent.toString();
    }

    let params = new URLSearchParams();
    params.set('parent', parent_param); // the user's search value

    let options = new RequestOptions({headers: this.headers});
    options.search = params;

    return this.http
      .get(Utils.elementsUrl, options)
      .toPromise()
      .then((response) => {
        return response.json() as ElementVi[];
      })
      .catch(this.handleError);
  }

  getFavorite(): Promise<Favorite[]> {

    let options = new RequestOptions({headers: this.headers});

    return this.http
      .get(Utils.favoriteUrl, options)
      .toPromise()
      .then((response) => {
        return response.json() as Favorite[];
      })
      .catch(this.handleError);
  }

  createElement(name: string, description: string, element_type: string, parentElement: ElementVi): Promise<ElementVi> {
    let parent_el: any = null;
    if (parentElement != null) {
      parent_el = parentElement.element;
    }

    let options = new RequestOptions({headers: this.headers});

    let data =
      {
        name: name,
        description: description,
        element_type: element_type,
        parent: parent_el
      };

    return this.http
      .post(Utils.elementsUrl,
        data,
        options)
      .toPromise()
      .then(res => res.json())
      .catch(this.handleError);
  }

  setFavorite(id: number): Promise<any> {
    const url = `${Utils.elementsUrl}${id}/set-favorite/`;

    return this.http
      .post(url, null, {headers: this.headers})
      .toPromise()
      .then((response) => {
        return response.json();
      })
      .catch(this.handleError);
  }

  editElement(currentElement: ElementVi): Promise<ElementVi> {

    const url = `${Utils.elementsUrl}${currentElement.element}/`;

    return this.http
      .put(url, JSON.stringify(currentElement), {headers: this.headers})
      .toPromise()
      .then(() => currentElement)
      .catch(this.handleError);
  }

}
