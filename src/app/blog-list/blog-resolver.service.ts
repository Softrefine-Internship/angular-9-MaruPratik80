import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { map, switchMap, take } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Store } from '@ngrx/store';
import { Actions, ofType } from '@ngrx/effects';
import { Blog } from './blog.modal';
import * as fromApp from '../store/app.reducer';
import * as BlogActions from './store/blog.actions';

@Injectable({
  providedIn: 'root',
})
export class BlogResolverService implements Resolve<Blog[]> {
  constructor(private store: Store<fromApp.AppState>, private actions$: Actions) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Blog[] | Observable<Blog[]> | Promise<Blog[]> {
    return this.store.select('blog').pipe(
      take(1),
      map(blogsState => blogsState.blogs),
      switchMap(blogs => {
        if (blogs.length === 0) {
          this.store.dispatch(new BlogActions.FetchBlogs(blogs.length));
          return this.actions$.pipe(ofType(BlogActions.SET_BLOGS), take(1));
        } else {
          return of(blogs);
        }
      })
    );
  }
}
