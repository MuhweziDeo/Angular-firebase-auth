import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {Store} from '@ngrx/store';
import {FormControl, Validators} from '@angular/forms';
import {showLoader, stopLoader} from '@store/loader/loader.actions';
import {AuthService} from '@core/services/auth.service';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.scss', '../login/login.component.scss']
})
export class PasswordResetComponent implements OnInit {
  $loading: Observable<boolean>;
  email: FormControl = new FormControl('', [Validators.required, Validators.email]);
  constructor(
    private store: Store<{loading: boolean}>,
    private auth: AuthService,
    private snackBar: MatSnackBar
  ) {
    this.$loading = this.store.select('loading');
  }

  ngOnInit(): void {
  }

  async sendPasswordResetEmail(): Promise<void> {
    this.store.dispatch(showLoader());
    try {
        await this.auth.sendPasswordResetEmail(this.email.value);
        this.snackBar.open('Password Reset email send', 'Exit', {duration: 2000});
        this.store.dispatch(stopLoader());
    } catch (e) {
      this.store.dispatch(stopLoader());
      this.snackBar.open(e.message, 'Exit');
    }
    return;
  }

}
