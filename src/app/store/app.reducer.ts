import { ActionReducerMap } from '@ngrx/store';
import * as fromAuth from '../auth/store/auth.reducer';
import * as fromBlog from '../blog-list/store/blog.reducer';

export interface AppState {
  auth: fromAuth.State;
  blog: fromBlog.State;
}

export const appReducer: ActionReducerMap<AppState> = {
  auth: fromAuth.authReducer,
  blog: fromBlog.blogReducer,
};
