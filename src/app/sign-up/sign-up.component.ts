import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

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

  signUpForm:FormGroup = new FormGroup({
    name:new FormControl('' , [Validators.required]),
    email:new FormControl('',[Validators.required,Validators.email]),
    password:new FormControl('',[Validators.required , Validators.pattern(/^\w{6,}$/)]),
    rePassword:new FormControl('',[Validators.required , Validators.pattern(/^\w{6,}$/)])
  })


  storeRegisterData():void{
    //////////////////////////
    let name = this.signUpForm.get('name')?.value
    let email = this.signUpForm.get('email')?.value
    let password = this.signUpForm.get('password')?.value

    this._AuthService.signUpWithEmailAndPassword(email, password).subscribe({
      next: (res) => {
        console.log(res);

        let idToken=res.idToken
        this._AuthService.updateProfile(idToken,name).subscribe({
          next: (res) => {
            // save user data in local storage
            let currentUser = {
              id:res.localId,
              fullName: res.displayName,
              email: res.email,
              idToken:idToken
            }
            localStorage.setItem('curretUser', JSON.stringify(currentUser))
            // navigate to home
            this.Message="Sign Up Success"
            this.signUpForm.reset()
            this.signUpSuccess = true;
            setTimeout(() => {
              this.signUpSuccess = false;
              this._Router.navigate(['table'])
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
        this.signUpError = true;
        setTimeout(() => {
          this.signUpError = false;
        },2500)
      },
    })
  }
}
