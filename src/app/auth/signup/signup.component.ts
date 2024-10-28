import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import * as fromApp from '../../store/app.reducer';
import * as AuthActions from '../store/auth.actions';
import { first } from 'rxjs';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  signupForm!: FormGroup;
  submitted = false;

  showPassword: boolean = false;
  showConfirmPassword: boolean = false;

  constructor(private store: Store<fromApp.AppState>) {}

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  toggleConfirmPassword() {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  ngOnInit(): void {
    this.signupForm = new FormGroup(
      {
        firstName: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z0-9]+$')]),
        lastName: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z0-9]+$')]),
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', [Validators.required, Validators.minLength(8)]),
        confirmPassword: new FormControl('', Validators.required),
      },
      {
        // validator: MustMatch('password', 'confirmPassword'),
      }
    );
  }

  onSubmit() {
    this.submitted = true;
    if (!this.signupForm.valid) return;

    this.store.dispatch(
      new AuthActions.SignupStart({
        firstName: this.signupForm.value.firstName,
        lastName: this.signupForm.value.lastName,
        email: this.signupForm.value.email,
        password: this.signupForm.value.password,
      })
    );

    // https://user-a8256-default-rtdb.asia-southeast1.firebasedatabase.app/
  }
}
