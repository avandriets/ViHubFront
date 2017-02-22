import {Injectable} from '@angular/core';
import {Http, Headers, RequestOptions} from "@angular/http";
import {Attachment} from "../classes/base-objects/attachment";
import {Utils} from "../classes/utility/utils";
import {Observable} from "rxjs";

@Injectable()
export class FilesService {

  headers: Headers;

  constructor(private http: Http) {
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }

  uploadAttachment(newFile: Attachment, fileToUpload: any): Observable<any> {

    let token = localStorage.getItem('token');

    let input = new FormData();
    input.append("fileURL", fileToUpload);
    input.append("element", newFile.element);
    input.append("description", newFile.description);

    let head = new Headers();
    head.append('Accept', 'application/json');
    head.append('Authorization', 'Bearer ' + token);

    let options = new RequestOptions({headers: head});
    return this.http.post(Utils.attachmentUrl, input, options)
      .map(res => res.json())
      .catch(error => Observable.throw(error));
  }

}
