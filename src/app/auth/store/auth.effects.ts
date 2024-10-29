import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import * as AuthActions from './auth.actions';
import { User } from '../user.model';

@Injectable()
export class AuthEffects {
  authSignup = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthActions.SIGNUP_START),
      switchMap((signupAction: AuthActions.SignupStart) => {
        return this.http
          .post<User>('http://localhost:3000/users', {
            firstName: signupAction.payload.firstName,
            lastName: signupAction.payload.lastName,
            email: signupAction.payload.email,
            password: signupAction.payload.password,
          })
          .pipe(
            map(() => {
              return new AuthActions.SignupSuccess();
            }),
            catchError(errorRes => {
              console.log(errorRes);
              return of(new AuthActions.LoginFail('An unknown error occurred!'));
            })
          );
      })
    );
  });

  authRedirectFromSignup = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(AuthActions.SIGNUP_SUCCESS),
        tap(() => {
          this.router.navigate(['/login']);
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
            const user = users.find(user => authData.payload.email === user.email);
            if (!user) {
              return new AuthActions.LoginFail('Email does Not Exist!');
            }
            if (authData.payload.password === user.password) {
              localStorage.setItem('userData', JSON.stringify({ email: user.email, userId: user.id }));
              return new AuthActions.LoginSuccess({
                email: user.email,
                userId: user.id,
                redirect: true,
              });
            } else {
              return new AuthActions.LoginFail('Wrong Password!');
            }
          }),
          catchError(errorRes => {
            console.log(errorRes);
            return of(new AuthActions.LoginFail('An unknown error occurred!'));
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
          userId: string;
        } = userDataString ? JSON.parse(userDataString) : null;
        if (!userData) return { type: 'DUMMY' };

        return new AuthActions.LoginSuccess({
          email: userData.email,
          userId: userData.userId,
          redirect: false,
        });
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
