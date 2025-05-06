import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { signIn, signUp, updateProfile } from '../../firebase-envirnoment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private _http: HttpClient) { }

  signUpWithEmailAndPassword(email: string, password: string):Observable<any>{
    return this._http.post(signUp, {
      'email': email,
      'password': password,
      'returnSecureToken': true
    })
  }
  updateProfile(id:any,name: string): Observable<any> {
    return this._http.post(updateProfile, {
      "idToken":id,
      "displayName": name
    })
    // "photoUrl"
  }

  loginWithEmailAndPassword(email: string, password: string):Observable<any>{
    return this._http.post(signIn, {
      'email': email,
      'password': password,
      'returnSecureToken': true
    })
  }

}
