import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Store } from '@ngrx/store';
import * as fromApp from '../../store/app.reducer';
import * as AuthActions from '../store/auth.actions';
import { catchError, map } from 'rxjs/operators';
import { Observable, of, Subscription } from 'rxjs';
import { User } from '../user.model';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit, OnDestroy {
  signupForm!: FormGroup;
  submitted = false;
  showPassword: boolean = false;
  showConfirmPassword: boolean = false;

  isLoading = false;
  error: string | null = null;
  message: string | null = null;

  private storeSub!: Subscription;

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

    this.storeSub = this.store.select('auth').subscribe(authState => {
      this.isLoading = authState.loading;
      this.error = authState.authError;
      this.message = authState.message;
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

  ngOnDestroy(): void {
    if (this.storeSub) this.storeSub.unsubscribe();
  }
}
