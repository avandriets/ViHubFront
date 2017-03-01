import {Injectable} from '@angular/core';
import {Http, Headers, RequestOptions, URLSearchParams} from "@angular/http";
import {Attachment} from "../classes/base-objects/attachment";
import {Utils} from "../classes/utility/utils";
import {Observable} from "rxjs";
import {ElementVi} from "../classes/base-objects/element-vi";

@Injectable()
export class FilesService {

  headers: Headers;

  constructor(private http: Http) {

    this.headers = new Headers(
      {
        'Content-Type': 'application/json',
        'Accept': '*/*',
        'Authorization': 'Bearer ' + Utils.getToken(),
      }
    );

  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }

  uploadAttachment(newFile: Attachment, fileToUpload: any): Observable<any> {

    let input = new FormData();
    input.append("fileURL", fileToUpload);
    input.append("element", newFile.element);
    input.append("description", newFile.description);

    let head = new Headers();
    head.append('Accept', 'application/json');
    head.append('Authorization', 'Bearer ' + Utils.getToken());

    let options = new RequestOptions({headers: head});
    return this.http.post(Utils.attachmentUrl, input, options)
      .map(res => res.json())
      .catch(error => Observable.throw(error));
  }

  getFilesList(element: ElementVi): Observable<Attachment[]> {
    let params = new URLSearchParams();
    params.set('element', element.element.toString());

    let options = new RequestOptions({headers: this.headers, search: params});

    return this.http.get(Utils.attachmentUrl, options)
      .map(result => result.json() as Attachment[])
      .catch(error => Observable.throw(error));
  }

  deleteAttachments(fileAttachment: Attachment): Observable<Attachment> {
    const url = `${Utils.attachmentUrl}${fileAttachment.id}/`;

    return this.http.delete(url, {headers: this.headers})
      .map(result => fileAttachment)
      .catch(error => Observable.throw(error));

      // .delete(url, {headers: this.headers})
      // .toPromise()
      // .then(() => deleteNote)
      // .catch(this.handleError);
  }
}
