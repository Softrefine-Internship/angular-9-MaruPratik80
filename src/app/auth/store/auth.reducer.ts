import * as AuthActions from './auth.actions';

export interface State {
  user: { email: string; userId: string } | null;
  authError: string | null;
  message: string | null;
  loading: boolean;
}

const initialState: State = {
  user: null,
  authError: null,
  message: null,
  loading: false,
};

export function authReducer(state: State = initialState, action: AuthActions.AuthActions) {
  switch (action.type) {
    case AuthActions.LOGIN_START:
      return {
        ...state,
        authError: null,
        loading: true,
        message: null,
      };
    case AuthActions.LOGIN_SUCCESS:
      const act = action as AuthActions.LoginSuccess;
      const user = { email: act.payload.email, userId: act.payload.userId };
      return {
        ...state,
        authError: null,
        user,
        loading: false,
      };
    case AuthActions.LOGIN_FAIL:
      return {
        ...state,
        user: null,
        authError: (action as AuthActions.LoginFail).payload,
        loading: false,
      };
    case AuthActions.SIGNUP_START:
      return {
        ...state,
        authError: null,
        loading: true,
      };
    case AuthActions.SIGNUP_SUCCESS:
      return {
        ...state,
        authError: null,
        message: 'Signup Successfull',
        loading: false,
      };
    case AuthActions.SIGNUP_FAIL:
      return {
        ...state,
        authError: (action as AuthActions.SignupFail).payload,
        loading: false,
      };
    case AuthActions.LOGOUT:
      return {
        ...state,
        user: null,
      };
    default:
      return state;
  }
}
