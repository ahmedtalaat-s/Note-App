import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.scss'
})
export class SignInComponent {
  constructor(private _AuthService: AuthService,private _Router:Router) { }

  signInError: boolean = false;
  signInSuccess: boolean = false;
  Message!: string;


  signInForm:FormGroup = new FormGroup({
    email:new FormControl('',[Validators.required,Validators.email]),
    password:new FormControl('',[Validators.required , Validators.pattern(/^\w{6,}$/)]),
  })


  handleLogin():void{
    //////////////////////////
    let name = this.signInForm.get('name')?.value
    let email = this.signInForm.get('email')?.value
    let password = this.signInForm.get('password')?.value

    this._AuthService.loginWithEmailAndPassword(email, password).subscribe({
      next: (res) => {
        // save user data in local storage
        console.log(res);

            let currentUser = {
              id:res.localId,
              fullName: res.displayName,
              email: res.email,
              idToken:res.idToken,
              imgUrl:res.profilePicture
            }
            localStorage.setItem('currentUser', JSON.stringify(currentUser))
            // navigate to home
            this.Message="Login Success"
            this.signInForm.reset()
            this.signInSuccess = true;
            setTimeout(() => {
              this.signInSuccess = false;
              this._Router.navigate(['/notes'])
            }, 1500)
      },
      error: (err) => {
        // display error message
        console.log(err);

        let error=err.error.error.message
        if (error == 'EMAIL_NOT_FOUND') {
          this.Message="Email dosen't Exists"
        }
        else if (error == "INVALID_PASSWORD"||error=="INVALID_LOGIN_CREDENTIALS") {
          this.Message="Incorrect Email Or password"
        }
        else if (error == "USER_DISABLED") {
          this.Message="you have been blocked"
        }
        this.signInForm.reset()
        this.signInError = true;
        setTimeout(() => {
          this.signInError = false;
        },2500)
      },
    })
  }
}
