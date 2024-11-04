import { Action } from '@ngrx/store';

export const LOGOUT = '[Auth] Logout';
export const LOGIN_START = '[Auth] Login Start';
export const LOGIN_SUCCESS = '[Auth] Login Success';
export const LOGIN_FAIL = '[Auth] Login Fail';
export const AUTO_LOGIN = '[Auth] Auto Login';
export const SIGNUP_START = '[Auth] Signup Start';
export const SIGNUP_SUCCESS = '[Auth] Signup Success';
export const SIGNUP_FAIL = '[Auth] Signup Fail';

export class Logout implements Action {
  readonly type: string = LOGOUT;
}

export class LoginStart implements Action {
  readonly type: string = LOGIN_START;

  constructor(public payload: { email: string; password: string }) {}
}

export class LoginSuccess implements Action {
  readonly type: string = LOGIN_SUCCESS;

  constructor(
    public payload: {
      email: string;
      userId: string;
      redirect: boolean;
    }
  ) {}
}

export class LoginFail implements Action {
  readonly type: string = LOGIN_FAIL;

  constructor(public payload: string) {}
}

export class AutoLogin implements Action {
  readonly type: string = AUTO_LOGIN;
}

export class SignupStart implements Action {
  readonly type: string = SIGNUP_START;

  constructor(public payload: { firstName: string; lastName: string; email: string; password: string }) {}
}

export class SignupSuccess implements Action {
  readonly type: string = SIGNUP_SUCCESS;
}

export class SignupFail implements Action {
  readonly type: string = SIGNUP_FAIL;

  constructor(public payload: string) {}
}

export type AuthActions =
  | Logout
  | LoginStart
  | LoginSuccess
  | LoginFail
  | AutoLogin
  | SignupStart
  | SignupSuccess
  | SignupFail
  | AutoLogin;
