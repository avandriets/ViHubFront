import {Injectable} from '@angular/core';
import {ElementVi} from "../classes/base-objects/element-vi";
import {Utils} from "../classes/utility/utils";
import {URLSearchParams, Http, Headers} from "@angular/http";
import {Favorite} from "../classes/base-objects/favorite";


@Injectable()
export class ElementsService {

  private headers = new Headers({'Content-Type': 'application/json'});

  constructor(private http: Http) {
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

    return this.http
      .get(Utils.elementsUrl, {search: params})
      .toPromise()
      .then((response) => {
        return response.json() as ElementVi[];
      })
      .catch(this.handleError);
  }

  getFavorite(): Promise<Favorite[]> {

    return this.http
      .get(Utils.favoriteUrl)
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
    return this.http
      .post(Utils.elementsUrl, JSON.stringify({name: name, description: description, element_type: element_type, parent: parent_el}), {headers: this.headers})
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
