import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { take, takeUntil, withLatestFrom } from 'rxjs/operators';
import { Post } from '../../interfaces/post.inteface';
import { PostCardService } from '../../services/post-card.service';
import { PostService } from '../../services/posts.service';

@Component({
  selector: 'app-post-card',
  templateUrl: './post-card.component.html',
  styleUrls: ['./post-card.component.scss']
})
export class PostCardComponent implements OnInit {
  post$: Observable<Post | null> = this.postCardService.postCard$;
  private onDestroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private readonly postCardService: PostCardService,
    private readonly postService: PostService,
    private readonly route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.postCardService.postCard$.pipe(
      takeUntil(this.onDestroy$),
      take(1),
      withLatestFrom(this.route.params)
    ).subscribe(([postCard, params]) => {
      if (!postCard) {
        this.post$ = this.postService.getPost(params.id);
      }
    });
  }
}
