import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss'
})
export class SignUpComponent {
  constructor(private _AuthService:AuthService){}

  signUpForm:FormGroup = new FormGroup({
    name:new FormControl('' , [Validators.required]),
    email:new FormControl('',[Validators.required,Validators.email]),
    password:new FormControl('',[Validators.required , Validators.pattern(/^\w{6,}$/)]),
    rePassword:new FormControl('',[Validators.required , Validators.pattern(/^\w{6,}$/)])
  })


  storeRegisterData():void{
    //////////////////////////
  }
}
