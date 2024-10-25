import { Action } from '@ngrx/store';
import { Blog } from '../blog.modal';

export const SET_BLOGS = '[Blogs] Set Blogs';
export const FETCH_BLOGS = '[Blogs] Fetch Blogs';
export const FETCH_BLOG = '[Blogs] Fetch Blogs';

export class SetBlogs implements Action {
  readonly type: string = SET_BLOGS;

  constructor(public payload: Blog[]) {}
}

export class FetchBlogs implements Action {
  readonly type: string = FETCH_BLOGS;

  constructor(public payload: number) {}
}

export type BlogActions = SetBlogs | FetchBlogs;
