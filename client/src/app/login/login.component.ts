import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { AuthService } from '@core/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  hide = true;
  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [Validators.required, Validators.minLength(6)]);

  constructor(
    private authService: AuthService,
    private snackbar: MatSnackBar
  ) {

  }

  ngOnInit(): void {
  }

  async submit(): Promise<void> {
    console.log('submitted');
    try {
      const response = await this.authService.sigInWithEmailAndPassword(this.email.value, this.password.value);
    } catch ({message}) {
      this.snackbar.open(message, 'Exit');
    }

  }

  async google(): Promise<void> {
    try {
        const response = await this.authService.googleLogin();
        console.log(response);
    } catch (error) {
      console.log(error);
    }
  }

}
