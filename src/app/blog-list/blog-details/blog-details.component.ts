import { Component, OnDestroy, OnInit } from '@angular/core';
import { Blog } from '../blog.modal';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { map, switchMap } from 'rxjs/operators';
import * as fromApp from '../../store/app.reducer';
import * as BlogActions from '../store/blog.actions';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-blog-details',
  templateUrl: './blog-details.component.html',
  styleUrls: ['./blog-details.component.scss'],
})
export class BlogDetailsComponent implements OnInit, OnDestroy {
  blog: Blog | null = null;
  id!: number;
  private blogSub!: Subscription;

  constructor(private route: ActivatedRoute, private store: Store<fromApp.AppState>) {}

  ngOnInit() {
    this.route.params.pipe(map(params => +params['id'])).subscribe(id => {
      this.store.dispatch(new BlogActions.FetchBlog(id));
    });

    this.blogSub = this.store
      .select('blog')
      .pipe(map(blogsState => blogsState.blog))
      .subscribe((blog: Blog | null) => {
        this.blog = blog;
      });
  }

  ngOnDestroy(): void {
    this.blogSub.unsubscribe();
  }
}
