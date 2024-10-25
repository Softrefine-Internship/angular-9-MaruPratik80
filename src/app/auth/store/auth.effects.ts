import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import * as AuthActions from './auth.actions';
// import { User } from '../user.model';

export interface AuthResponseData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

const handleAuthentication = (email: string, password: string) => {
  // const user = new User(email, userId, token, expirationDate);
  // localStorage.setItem('userData', JSON.stringify(user));
  localStorage.setItem('userData', JSON.stringify({ email, password }));
  return new AuthActions.AuthenticateSuccess({
    email: email,
    password: password,
    redirect: true,
  });
};

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
  /* authSignup = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthActions.SIGNUP_START),
      switchMap((signupAction: AuthActions.SignupStart) => {
        return this.http
          .post<AuthResponseData>(
            'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=' +
              environment.firebaseAPIKey,
            {
              email: signupAction.payload.email,
              password: signupAction.payload.password,
              returnSecureToken: true,
            }
          )
          .pipe(
            
            map(resData =>
              handleAuthentication(
                +resData.expiresIn,
                resData.email,
                resData.localId,
                resData.idToken
              )
            ),
            catchError(errorRes => handleError(errorRes))
          );
      })
    );
  }); */

  authLogin = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(AuthActions.LOGIN_START),
        map((authData: AuthActions.LoginStart) => {
          // localStorage.setItem('userData', JSON.stringify(authData.payload));
          // this.router.navigate(['/blogs']);
          return handleAuthentication(authData.payload.email, authData.payload.password);
        })
        // switchMap((authData: AuthActions.LoginStart) => {
        // return this.http
        //   .post<AuthResponseData>(
        //     'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=',
        //     //  + environment.firebaseAPIKey
        //     {
        //       email: authData.payload.email,
        //       password: authData.payload.password,
        //       returnSecureToken: true,
        //     }
        //   )
        //   .pipe(
        //     map(resData => handleAuthentication(resData.email)),
        //     catchError(errorRes => handleError(errorRes))
        //   );
        // })
      );
    }
    // { dispatch: false }
  );

  authRedirect = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(AuthActions.AUTHENTICATE_SUCCESS),
        tap((authSuccsessAction: AuthActions.AuthenticateSuccess) => {
          if (authSuccsessAction.payload.redirect) this.router.navigate(['/blogs']);
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
        console.log(userData);
        if (!userData) {
          return { type: 'DUMMY' };
        }

        if (userData) {
          // const expirationDuration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
          return new AuthActions.AuthenticateSuccess({
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
