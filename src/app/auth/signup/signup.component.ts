import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Store } from '@ngrx/store';
import * as fromApp from '../../store/app.reducer';
import * as AuthActions from '../store/auth.actions';
import { catchError, map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { User } from '../user.model';

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

  constructor(private store: Store<fromApp.AppState>, private http: HttpClient) {}

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  toggleConfirmPassword() {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  ngOnInit(): void {
    this.signupForm = new FormGroup({
      firstName: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z0-9]+$')]),
      lastName: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z0-9]+$')]),
      email: new FormControl('', [Validators.required, Validators.email], this.emailTaken.bind(this)),
      password: new FormControl('', [Validators.required, Validators.minLength(8)]),
      confirmPassword: new FormControl('', [Validators.required, this.mustMatch.bind(this)]),
    });
  }

  mustMatch(control: AbstractControl): ValidationErrors | null {
    return control.value !== this.signupForm?.get('password')?.value ? { mustMatch: true } : null;
  }

  emailTaken(control: AbstractControl): Observable<ValidationErrors | null> {
    return this.http.get<User[]>('http://localhost:3000/users').pipe(
      map(res => {
        return res.find(user => user.email === control.value) ? { emailTaken: true } : null;
      }),
      catchError(() => of(null))
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
