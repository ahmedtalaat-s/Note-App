import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { BlankLayoutComponent } from './blank-layout/blank-layout.component';
import { NotesComponent} from './Notes/notes.component';
import { AddTaskComponent } from './add-task/add-task.component';
import { AuthLayoutComponent } from './auth-layout/auth-layout.component';

const routes: Routes = [
{path:'' , component: BlankLayoutComponent , children:[
  {path:"" , redirectTo: 'notes' , pathMatch: 'full'},
  {path:"notes" , component:NotesComponent , title: "Your Notes"},
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
