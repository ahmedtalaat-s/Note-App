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
  updateProfile(id:any,name: string,imgUrl:string): Observable<any> {
    return this._http.post(updateProfile, {
      "idToken":id,
      "displayName": name,
    "photoUrl":imgUrl

    })
  }

  loginWithEmailAndPassword(email: string, password: string):Observable<any>{
    return this._http.post(signIn, {
      'email': email,
      'password': password,
      'returnSecureToken': true
    })
  }

  // upload file
  uploadToCloudinary(file: File):Observable<any>{
    const url = `https://api.cloudinary.com/v1_1/dqhckst1a/image/upload`;

    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'unsigned_preset');

    return this._http.post<any>(url, formData)
  }

}
