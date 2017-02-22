import {Injectable} from '@angular/core';
import {Http, Headers} from "@angular/http";
import {MessageVi} from "../classes/base-objects/message-vi";
import {Utils} from "../classes/utility/utils";

@Injectable()
export class MessagesService {

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

  editMessage(editedMessage: MessageVi): Promise<MessageVi> {

    const url = `${Utils.messageUrl}${editedMessage.id}/`;

    return this.http
      .put(url, JSON.stringify(editedMessage), {headers: this.headers})
      .toPromise()
      .then((res) => res.json() as MessageVi)
      .catch(this.handleError);
  }

  deleteMessage(deleteMessage: MessageVi): Promise<MessageVi> {

    const url = `${Utils.messageUrl}${deleteMessage.id}/`;

    return this.http
      .delete(url, {headers: this.headers})
      .toPromise()
      .then(() => deleteMessage)
      .catch(this.handleError);
  }

  getMessages(element: number): Promise<MessageVi[]> {

    const url = `${Utils.elementsUrl}${element}/get-messages/`;

    return this.http
      .get(url, {headers: this.headers})
      .toPromise()
      .then((response) => {
        return response.json() as MessageVi[];
      })
      .catch(this.handleError);
  }

  createMessage(newMessage: MessageVi): Promise<MessageVi> {
    return this.http
      .post(Utils.messageUrl, JSON.stringify(newMessage), {headers: this.headers})
      .toPromise()
      .then(res => res.json())
      .catch(this.handleError);
  }
}
