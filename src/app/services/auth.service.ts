import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { signUp } from '../../firebase-envirnoment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private _http: HttpClient) { }

  signUp(name:string,email:string,password:string):Observable<any> {
    return this._http.post(signUp, {
      'email': email,
      'password': password,
      'returnSecureToken':true
    })
  }
}
