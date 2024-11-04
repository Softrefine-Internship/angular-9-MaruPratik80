import { Action } from '@ngrx/store';
import { Blog } from '../blog.modal';
import * as BlogActions from './blog.actions';

export interface State {
  blogs: Blog[];
  blog: Blog | null;
}

const initialState: State = {
  blogs: [],
  blog: null,
};

export function blogReducer(state = initialState, action: BlogActions.BlogActions | Action) {
  switch (action.type) {
    case BlogActions.SET_BLOGS:
      return {
        ...state,
        blogs: [...state.blogs, ...(action as BlogActions.SetBlogs).payload],
      };
    case BlogActions.FETCH_BLOG:
      return {
        ...state,
        blog: null,
      };
    case BlogActions.SET_BLOG:
      return {
        ...state,
        blog: (action as BlogActions.SetBlog).payload,
      };
    default:
      return state;
  }
}
