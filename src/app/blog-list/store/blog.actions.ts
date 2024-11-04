import { Action } from '@ngrx/store';
import { Blog } from '../blog.modal';

export const SET_BLOGS = '[Blogs] Set Blogs';
export const FETCH_BLOGS = '[Blogs] Fetch Blogs';
export const SET_BLOG = '[Blogs] Set Blog';
export const FETCH_BLOG = '[Blogs] Fetch Blog';

export class SetBlogs implements Action {
  readonly type: string = SET_BLOGS;

  constructor(public payload: Blog[]) {}
}

export class FetchBlogs implements Action {
  readonly type: string = FETCH_BLOGS;

  constructor(public payload: number) {}
}
export class SetBlog implements Action {
  readonly type: string = SET_BLOG;

  constructor(public payload: Blog) {}
}

export class FetchBlog implements Action {
  readonly type: string = FETCH_BLOG;

  constructor(public payload: number) {}
}

export type BlogActions = SetBlogs | FetchBlogs | SetBlog | FetchBlog;
