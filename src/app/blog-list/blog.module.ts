import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../auth/auth.guard';
import { BlogDetailsComponent } from './blog-details/blog-details.component';
import { BlogListComponent } from './blog-list.component';
import { BlogResolverService } from './blog-resolver.service';

const routes: Routes = [
  {
    path: '',
    component: BlogListComponent,
    canActivate: [AuthGuard],
    // children: [
    //   {
    //     path: ':id',
    //     component: BlogDetailsComponent,
    //   },
    // ],
    resolve: [BlogResolverService],
  },
  {
    path: ':id',
    canActivate: [AuthGuard],
    component: BlogDetailsComponent,
    resolve: [BlogResolverService],
  },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class BlogModule {}
