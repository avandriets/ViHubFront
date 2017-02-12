import {Injectable} from '@angular/core';
import {NoteVi} from "../classes/base-objects/note-vi";
import {Http, Headers} from "@angular/http";
import {Utils} from "../classes/utility/utils";

@Injectable()
export class NotesService {

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

  createNote(newNote: NoteVi): Promise<NoteVi> {
    return this.http
      .post(Utils.noteUrl, JSON.stringify(newNote), {headers: this.headers})
      .toPromise()
      .then(res => res.json())
      .catch(this.handleError);
  }

  editNote(editedNote: NoteVi): Promise<NoteVi> {

    const url = `${Utils.noteUrl}${editedNote.id}/`;

    return this.http
      .put(url, JSON.stringify(editedNote), {headers: this.headers})
      .toPromise()
      .then((res) => res.json() as NoteVi)
      .catch(this.handleError);
  }

  deleteNote(deleteNote: NoteVi): Promise<NoteVi> {

    const url = `${Utils.noteUrl}${deleteNote.id}/`;

    return this.http
      .delete(url, {headers: this.headers})
      .toPromise()
      .then(() => deleteNote)
      .catch(this.handleError);
  }

  getNotes(element: number): Promise<NoteVi[]> {
    const url = `${Utils.elementsUrl}${element}/get-notes/`;

    return this.http
      .get(url, {headers: this.headers})
      .toPromise()
      .then((response) => {
        return response.json() as NoteVi[];
      })
      .catch(this.handleError);
  }
}
