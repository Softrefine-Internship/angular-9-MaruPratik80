import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-blog-list',
  templateUrl: './blog-list.component.html',
  styleUrls: ['./blog-list.component.scss'],
})
export class BlogListComponent implements OnInit {
  blogs!: any[];
  page = 1;
  limit = 10;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadBlogs();
  }

  loadBlogs(): void {
    this.http
      .get(
        'https://api.slingacademy.com/v1/sample-data/blog-posts?offset=5&limit=30'
      )
      .subscribe((response: any) => {
        console.log(response);
        this.blogs = response.blogs;
      });
    // this.blogService.getBlogs().subscribe((data) => {
    //   // Simulating pagination by slicing the data array
    //   const newBlogs = data.slice((this.page - 1) * this.limit, this.page * this.limit);
    //   this.blogs = [...this.blogs, ...newBlogs];
    // });
  }

  onScroll(): void {
    this.page++;
    this.loadBlogs();
  }
}
