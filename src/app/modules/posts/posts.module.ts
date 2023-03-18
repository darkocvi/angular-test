import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TableViewRoutingModule } from './posts-routing.module';
import { PostsComponent } from './pages/posts/posts.component';
import { SharedModule } from "../../shared/shared.module";
import { PostService } from "./services/posts.service";
import { CreatePostComponent } from './pages/create-post/create-post.component';
import { ReactiveFormsModule } from "@angular/forms";
import { UpdatePostComponent } from './pages/update-post/update-post.component';
import { PostCardComponent } from './pages/post-card/post-card.component';
import { PostCardService } from './services/post-card.service';


@NgModule({
  declarations: [
    PostsComponent,
    CreatePostComponent,
    UpdatePostComponent,
    PostCardComponent
  ],
  imports: [
    CommonModule,
    TableViewRoutingModule,
    ReactiveFormsModule,
    SharedModule,
  ],
  providers: [PostService, PostCardService]
})
export class TableViewModule { }
