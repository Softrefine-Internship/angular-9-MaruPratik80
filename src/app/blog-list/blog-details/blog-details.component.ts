import { Component, OnInit } from '@angular/core';
import { Blog } from '../blog.modal';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { map, switchMap } from 'rxjs/operators';
import * as fromApp from '../../store/app.reducer';

@Component({
  selector: 'app-blog-details',
  templateUrl: './blog-details.component.html',
  styleUrls: ['./blog-details.component.scss'],
})
export class BlogDetailsComponent implements OnInit {
  blog!: Blog;
  id!: number;

  constructor(private route: ActivatedRoute, private store: Store<fromApp.AppState>) {}

  ngOnInit() {
    this.route.params
      .pipe(
        map(params => +params['id']),
        switchMap((id: number) => {
          this.id = id - 1;
          return this.store.select('blog');
        }),
        map(blogState => {
          return blogState.blogs.find((blog, index) => index === this.id);
        })
      )
      .subscribe(blog => {
        this.blog = blog as Blog;
      });
  }
}
