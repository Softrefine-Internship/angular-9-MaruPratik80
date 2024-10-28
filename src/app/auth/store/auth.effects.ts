import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, find, map, switchMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import * as AuthActions from './auth.actions';
import { User } from '../user.model';

const handleError = (errorRes: any) => {
  let errorMessage = 'An unknown error occurred!';
  if (!errorRes.error || !errorRes.error.error) {
    return of(new AuthActions.AuthenticateFail(errorMessage));
  }
  switch (errorRes.error.error.message) {
    case 'EMAIL_EXISTS':
      errorMessage = 'This email exists already';
      break;
    case 'EMAIL_NOT_FOUND':
      errorMessage = 'This email does not exist.';
      break;
    case 'INVALID_PASSWORD':
      errorMessage = 'This password is not correct.';
      break;
  }
  return of(new AuthActions.AuthenticateFail(errorMessage));
};

@Injectable()
export class AuthEffects {
  authSignup = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(AuthActions.SIGNUP_START),
        switchMap((signupAction: AuthActions.SignupStart) => {
          return this.http.get<User[]>('http://localhost:3000/users');
          return this.http
            .post<User>('http://localhost:3000/users', {
              firstName: signupAction.payload.firstName,
              lastName: signupAction.payload.lastName,
              email: signupAction.payload.email,
              password: signupAction.payload.password,
            })
            .pipe(
              tap(resData => {
                console.log(resData);
                // return handleAuthentication(signupAction.payload.email, signupAction.payload.password);
              })
              // catchError(errorRes => handleError(errorRes))
            );
        })
      );
    },
    { dispatch: false }
  );

  authLogin = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthActions.LOGIN_START),
      switchMap((authData: AuthActions.LoginStart) => {
        return this.http.get<User[]>('http://localhost:3000/users').pipe(
          map(users => {
            const user = users.find(
              user => user.email === authData.payload.email && user.password === authData.payload.password
            );
            if (user) {
              localStorage.setItem('userData', JSON.stringify(user));
              return new AuthActions.LoginSuccess({
                email: user.email,
                password: user.password,
                redirect: true,
              });
            } else {
              return new AuthActions.AuthenticateFail('Email does not registered.');
            }
          }),
          catchError(errorRes => {
            console.log(errorRes);
            return of(new AuthActions.AuthenticateFail('An unknown error occurred!'));
          })
        );
      })
    );
  });

  authRedirect = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(AuthActions.LOGIN_SUCCESS),
        tap((loginSuccsessAction: AuthActions.LoginSuccess) => {
          if (loginSuccsessAction.payload.redirect) this.router.navigate(['/blogs']);
        })
      );
    },
    { dispatch: false }
  );

  autoLogin = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthActions.AUTO_LOGIN),
      map(() => {
        const userDataString = localStorage.getItem('userData');
        const userData: {
          email: string;
          password: string;
        } = userDataString ? JSON.parse(userDataString) : null;
        if (!userData) {
          return { type: 'DUMMY' };
        }

        if (userData) {
          return new AuthActions.LoginSuccess({
            email: userData.email,
            password: userData.password,
            redirect: false,
          });
        }
        return { type: 'DUMMY' };
      })
    );
  });

  authLogout = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(AuthActions.LOGOUT),
        tap(() => {
          localStorage.removeItem('userData');
          this.router.navigate(['/login']);
        })
      );
    },
    { dispatch: false }
  );

  constructor(private actions$: Actions, private http: HttpClient, private router: Router) {}
}
