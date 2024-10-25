import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, switchMap } from 'rxjs/operators';

import * as BlogActions from './blog.actions';
import { Blog } from '../blog.modal';
import * as fromApp from '../../store/app.reducer';

@Injectable()
export class BlogEffects {
  fetchBlogs = createEffect(() => {
    return this.actions$.pipe(
      ofType(BlogActions.FETCH_BLOGS),
      switchMap((fetchBlogsAction: BlogActions.FetchBlogs) => {
        return this.http.get<{ blogs: Blog[] }>(
          'https://api.slingacademy.com/v1/sample-data/blog-posts?limit=12',
          { params: new HttpParams().append('offset', fetchBlogsAction.payload) }
        );
      }),
      map(response => response?.['blogs']),
      map(blogs => {
        return blogs.map(blog => {
          return {
            ...blog,
          };
        });
      }),
      map(blogs => new BlogActions.SetBlogs(blogs))
    );
  });

  constructor(private actions$: Actions, private http: HttpClient, private store: Store<fromApp.AppState>) {}
}