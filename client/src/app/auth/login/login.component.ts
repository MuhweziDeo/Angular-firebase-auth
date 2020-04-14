import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { AuthService } from '@core/services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Store } from '@ngrx/store';
import { showLoader, stopLoader } from '@store/loader/loader.actions';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  hide = true;
  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [Validators.required, Validators.minLength(6)]);
  $loading: Observable<boolean>;
  constructor(
    private authService: AuthService,
    private snackbar: MatSnackBar,
    private store: Store<{loading: boolean}>
  ) {
    this.$loading = this.store.select('loading');
  }

  ngOnInit(): void {
  }

  async submit(): Promise<void> {
    this.store.dispatch(showLoader());
    try {
      const response = await this.authService.sigInWithEmailAndPassword(this.email.value, this.password.value);
      this.store.dispatch(stopLoader());
      this.snackbar.open('Successfully Logged in', 'Exit', {duration: 3000});
    } catch ({message}) {

      this.store.dispatch(stopLoader());
      this.snackbar.open(message, 'Exit');
    }

  }

  async google(): Promise<void> {
    try {
        this.store.dispatch(showLoader());
        const response = await this.authService.googleLogin();
        this.store.dispatch(stopLoader());
        this.snackbar.open('Successfully Logged in', 'Exit', {duration: 3000});
    } catch (error) {
      this.store.dispatch(stopLoader());
      this.snackbar.open(error.message, 'Exit');
    }
  }

}
