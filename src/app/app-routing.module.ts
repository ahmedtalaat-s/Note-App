import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { BlankLayoutComponent } from './blank-layout/blank-layout.component';
import { TableComponent } from './table/table.component';
import { AddTaskComponent } from './add-task/add-task.component';
import { AuthLayoutComponent } from './auth-layout/auth-layout.component';

const routes: Routes = [
{path:'' , component: BlankLayoutComponent , children:[
  {path:"" , redirectTo: 'table' , pathMatch: 'full'},
  {path:"table" , component:TableComponent , title: "Your Tasks"},
  {path:"addtask" , component: AddTaskComponent , title:"Add Task"}
]}
  ,
  {path:'', component:AuthLayoutComponent , children:[
    {path:"signin" , component: SignInComponent , title:"Sign In"},
    {path:"signup" , component: SignUpComponent , title:"Sign Up"},
  ]},
  
  {path:"**" , component:NotfoundComponent , title:"Not Found"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
