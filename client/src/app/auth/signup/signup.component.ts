import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, AbstractControl, Validators } from '@angular/forms';
import { AuthService } from '@core/services/auth.service';
import { MustMatch } from 'src/app/utils/validators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { showLoader, stopLoader } from '@store/loader/loader.actions';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss', '../login/login.component.scss']
})
export class SignupComponent implements OnInit {
  hide = true;
  signInForm: FormGroup;
  username: AbstractControl;
  email: AbstractControl;
  password: AbstractControl;
  confirmPassword: AbstractControl;
  $loading: Observable<boolean>;
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private snackbar: MatSnackBar,
    private store: Store<{loading: boolean}>,
    private router: Router
  ) {
    this.signInForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(5)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(6)]]
    }, {validator: MustMatch('password', 'confirmPassword')});

    this.$loading = this.store.select('loading');

  }

  ngOnInit(): void {
    this.username = this.signInForm.get('username');
    this.email = this.signInForm.get('email');
    this.password = this.signInForm.get('password');
    this.confirmPassword = this.signInForm.get('confirmPassword');
  }

  async createAccount(): Promise<void> {
    this.store.dispatch(showLoader());
    try {
        const res = await this.authService.createUser(this.signInForm.value);
        this.snackbar.open('Account created', 'Exit');
        this.store.dispatch(stopLoader());
        this.router.navigate(['']);
    } catch (error) {
      this.store.dispatch(stopLoader());
      this.snackbar.open(error.message, 'Exit');
    }
  }


}
