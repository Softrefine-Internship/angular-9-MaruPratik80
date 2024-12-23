import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../auth/auth.guard';
import { BlogDetailsComponent } from './blog-details/blog-details.component';
import { BlogListComponent } from './blog-list.component';
import { SharedModule } from '../shared/shared.module';

const routes: Routes = [
  {
    path: '',
    component: BlogListComponent,
    canActivate: [AuthGuard],
  },
  {
    path: ':id',
    canActivate: [AuthGuard],
    component: BlogDetailsComponent,
  },
];

@NgModule({
  declarations: [BlogListComponent, BlogDetailsComponent],
  imports: [CommonModule, SharedModule, RouterModule.forChild(routes)],
})
export class BlogModule {}
