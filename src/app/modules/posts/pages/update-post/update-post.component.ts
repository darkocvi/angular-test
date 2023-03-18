import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { LoadingService } from "../../../../core/services/loading.service";
import { PostService } from "../../services/posts.service";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: 'app-update-post',
  templateUrl: './update-post.component.html',
  styleUrls: ['./update-post.component.scss']
})
export class UpdatePostComponent implements OnInit {
  errorMessage: string = '';
  postForm: FormGroup = this.fb.group({
    title: [null, Validators.required],
    body: [null],
  });
  private postId: number = 0;

  constructor(
    private fb: FormBuilder,
    private readonly loadingService: LoadingService,
    private readonly postService: PostService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id && id !== 'create') {
        this.getPost(id);
        return;
      }
      this.router.navigateByUrl('/posts');
    })
  }

  getPost(id: string): void {
    const postId: number = parseFloat(id);
    if (isNaN(postId)) {
      this.router.navigateByUrl('/posts');
      return;
    }
    this.postId = postId;
    this.postService.getPost(postId).subscribe((post) => {
      this.postForm.patchValue(post);
    }, (error) => this.router.navigateByUrl('/posts'));
  }

  updatePost(): void {
    if (this.postForm.valid) {
      this.loadingService.setLoadingState(true);
      this.postService.updatePost(this.postId,{
        ...this.postForm.value,
        userId: 1,
      }).subscribe(() => {
        this.loadingService.setLoadingState(false);
        alert('Update successfully');
      }, (error) => {
        this.loadingService.setLoadingState(false);
        this.errorMessage = 'Can not create posts';
      })
    }
  }

}
