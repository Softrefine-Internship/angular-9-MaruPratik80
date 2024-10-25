import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { Blog } from './blog.modal';
import * as fromApp from '../store/app.reducer';
import * as BlogActions from './store/blog.actions';

@Component({
  selector: 'app-blog-list',
  templateUrl: './blog-list.component.html',
  styleUrls: ['./blog-list.component.scss'],
})
export class BlogListComponent implements OnInit, OnDestroy {
  blogs: Blog[] = [];
  subscription!: Subscription;

  constructor(private store: Store<fromApp.AppState>) {}

  ngOnInit() {
    this.subscription = this.store
      .select('blog')
      .pipe(map(blogsState => blogsState.blogs))
      .subscribe((blogs: Blog[]) => {
        this.blogs = blogs;
      });
  }

  onScroll() {
    this.store.dispatch(new BlogActions.FetchBlogs(this.blogs.length));
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
