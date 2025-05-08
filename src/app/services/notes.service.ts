import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { addNote, getNote, updateOrDeleteNote } from '../../firebase-envirnoment';

@Injectable({
  providedIn: 'root'
})
export class NotesService {

  constructor(private _HttpClient: HttpClient) { }
  // token for user Auth
  idToken = JSON.parse(localStorage.getItem('currentUser') as string).idToken
  // header
  header = new HttpHeaders({
    'Authorization': `Bearer ${this.idToken}`
  })

  // add note method
  addNote(userId:string,color:string,content:string): Observable<any>{
    return this._HttpClient.post(addNote,
{
  "fields":
  {
    "userId": { "stringValue": userId },
    "content": { "stringValue": content },
    "color": { "stringValue": color }
  }
}
      , { headers: this.header })
  }



  // update Note
  updateNote(noteId:string,userId:string,color:string,content:string): Observable<any>{
    return this._HttpClient.patch(`${updateOrDeleteNote}${noteId}`,
{
  "fields":
  {
    "userId": { "stringValue": userId },
    "content": { "stringValue": content },
    "color": { "stringValue": color }
  }
}
      , { headers: this.header })
  }
  // get Note for a user
  getNotesById(userId:string): Observable<any>{
    return this._HttpClient.post(getNote,
{
  "structuredQuery": {
    "from": [{ "collectionId": "notes" }],
    "where": {
      "fieldFilter": {
        "field": { "fieldPath": "userId" },
        "op": "EQUAL",
        "value": { "stringValue": userId }
      }
    }
  }
}
      , { headers: this.header })
  }

  // delete a note
  deleteNote(noteId:string):Observable<any>{
    return this._HttpClient.delete(`${updateOrDeleteNote}${noteId}`, { headers: this.header })
  }
}
