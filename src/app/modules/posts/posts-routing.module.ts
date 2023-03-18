import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostsComponent } from "./pages/posts/posts.component";
import { CreatePostComponent } from "./pages/create-post/create-post.component";
import { UpdatePostComponent } from "./pages/update-post/update-post.component";
import { PostCardComponent } from './pages/post-card/post-card.component';

const routes: Routes = [
  {
    path: '',
    component: PostsComponent,
  },
  {
    path: 'create',
    component: CreatePostComponent,
  },
  {
    path: ':id',
    component: UpdatePostComponent,
  },
  {
    path: 'view/:id',
    component: PostCardComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TableViewRoutingModule { }
