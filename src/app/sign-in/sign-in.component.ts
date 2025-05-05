import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.scss'
})
export class SignInComponent {
constructor(private _AuthService:AuthService){}

  signInForm:FormGroup = new FormGroup({
    email:new FormControl('',[Validators.required,Validators.email]),
    password:new FormControl('',[Validators.required , Validators.pattern(/^\w{6,}$/)]),
  })


  handleLogin():void{
    //////////////////////////
  }
}
