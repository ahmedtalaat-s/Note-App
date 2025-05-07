import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';


@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss'
})
export class SignUpComponent {
  constructor(private _AuthService: AuthService,private _Router:Router) { }

  signUpError: boolean = false;
  signUpSuccess: boolean = false;
  Message!: string;
  imgFile!: File;
  imgUrl!: string;

  signUpForm:FormGroup = new FormGroup({
    name:new FormControl('' , [Validators.required]),
    email:new FormControl('',[Validators.required,Validators.email]),
    password:new FormControl('',[Validators.required , Validators.pattern(/^\w{6,}$/)]),
    rePassword:new FormControl('',[Validators.required , Validators.pattern(/^\w{6,}$/)]),
    img:new FormControl('')
  })


  async storeRegisterData(){
    //////////////////////////
    let name = this.signUpForm.get('name')?.value
    let email = this.signUpForm.get('email')?.value
    let password = this.signUpForm.get('password')?.value
    await this.uploadImg()
      console.log('after done');

    this._AuthService.signUpWithEmailAndPassword(email, password).subscribe({
      next: (res) => {
        console.log(res);

        let idToken = res.idToken
        if(!this.imgUrl){this.imgUrl=''}
        this._AuthService.updateProfile(idToken,name,this.imgUrl).subscribe({
          next: (res) => {
            // save user data in local storage
            let currentUser = {
              id:res.localId,
              fullName: res.displayName,
              email: res.email,
              idToken: idToken,
              imgUrl:res.photoUrl
            }
            localStorage.setItem('currentUser', JSON.stringify(currentUser))
            // navigate to home
            this.Message="Sign Up Success"
            this.signUpForm.reset()
            this.signUpSuccess = true;
            setTimeout(() => {
              this.signUpSuccess = false;
              this._Router.navigate(['notes'])
            }, 1500)
          }
        })
      },
      error: (err) => {
        // display error message
        let error=err.error.error.message
        if (error == 'EMAIL_EXISTS') {
          this.Message='Email Already Exists'
        }
        else if (error == "TOO_MANY_ATTEMPTS_TRY_LATER") {
          this.Message="Too Many Attempts Try Later"
        }
        this.signUpForm.reset()
        this.imgUrl=''
        this.signUpError = true;
        setTimeout(() => {
          this.signUpError = false;
        },2500)
      },
    })
  }

onImgChange(event:any) {
  this.imgFile = event.target.files[0]
  }
async uploadImg(): Promise<void> {
  return new Promise((resolve, reject) => {
    this._AuthService.uploadToCloudinary(this.imgFile).subscribe({
      next: (res) => {
        this.imgUrl = res.secure_url;
        console.log('img done');
        console.log(this.imgUrl);
        resolve();  // signal that upload is done
      }
    });
  });
}

}
