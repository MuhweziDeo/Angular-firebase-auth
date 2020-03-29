import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { StoreModule } from '@ngrx/store';

import { AppComponent } from './app.component';
import { AngularMaterialModule } from './angular-material.module';
import { environment } from 'src/environments/environment';
import { LoginComponent } from './login/login.component';
import { CoreModule } from './core/core.module';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';

export const appRoutes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  }
];


const firebaseConfig = {
  apiKey: environment.apiKey,
  authDomain: environment.authDomain,
  databaseURL: environment.databaseURL,
  storageBucket: environment.storageBucket,
  messagingSenderId: environment.messagingSenderId
};
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    StoreModule.forRoot({}, {}),
    CoreModule,
    RouterModule.forRoot(appRoutes),
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
