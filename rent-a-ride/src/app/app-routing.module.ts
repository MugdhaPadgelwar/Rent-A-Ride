import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ResetComponent } from './reset/reset.component';


const routes: Routes = [  
  {
    path:"",
    component: SignupComponent
  },
  {
    path:"signin",
    component: LoginComponent
  } ,
  {
    path:"",
    component: ForgotPasswordComponent
  },
  {
    path:"forgotpassword",
    component: ForgotPasswordComponent
  }, 
  {
    path:"",
    component: ResetComponent
  },
  {
    path:"reset-password/:token",
    component: ResetComponent
  }  
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
