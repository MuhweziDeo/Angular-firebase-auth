import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AngularMaterialModule } from '../angular-material.module';
import { AuthComponent } from './auth.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SignupComponent } from './signup/signup.component';
import { PasswordResetComponent } from './password-reset/password-reset.component';

const routes: Routes = [
  {
    path: '',
    component: AuthComponent,
    children: [
      {
        path: '',
        component: LoginComponent,
      },
      {
        path: 'signup',
        component: SignupComponent
      },
      {
        path: 'password-reset',
        component: PasswordResetComponent
      }
    ]

  }
];

@NgModule({
  declarations: [
    LoginComponent,
    AuthComponent,
    SignupComponent,
    PasswordResetComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    AngularMaterialModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [],
  providers: []
})
export class AuthModule { }
