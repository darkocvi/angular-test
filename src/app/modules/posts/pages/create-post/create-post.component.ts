import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { LoadingService } from "../../../../core/services/loading.service";
import { PostService } from "../../services/posts.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreatePostComponent implements OnInit {
  errorMessage: string = '';
  postForm: FormGroup = this.fb.group({
    title: [null, Validators.required],
    body: [null],
  });

  constructor(
    private fb: FormBuilder,
    private readonly loadingService: LoadingService,
    private readonly postService: PostService,
    private readonly router: Router,
  ) { }

  ngOnInit(): void {
  }

  createPost(): void {
    if (this.postForm.valid) {
      this.loadingService.setLoadingState(true);
      this.postService.createPost({
        ...this.postForm.value,
        userId: 1,
      }).subscribe(() => {
        this.loadingService.setLoadingState(false);
        alert('create successfully');
        this.router.navigateByUrl('/posts');
      }, (error) => {
        this.loadingService.setLoadingState(false);
        this.errorMessage = 'Can not create posts';
      })
    }
  }
}
