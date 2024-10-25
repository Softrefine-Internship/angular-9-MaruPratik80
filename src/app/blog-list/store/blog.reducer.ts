import { Action } from '@ngrx/store';
import { Blog } from '../blog.modal';
import * as BlogActions from './blog.actions';

export interface State {
  blogs: Blog[];
}

const initialState: State = {
  blogs: [],
};

export function blogReducer(state = initialState, action: BlogActions.BlogActions | Action) {
  switch (action.type) {
    case BlogActions.SET_BLOGS:
      return {
        ...state,
        blogs: [...state.blogs, ...(<BlogActions.SetBlogs>action).payload],
      };
    default:
      return state;
  }
}
