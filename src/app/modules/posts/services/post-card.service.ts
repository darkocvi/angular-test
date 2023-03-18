import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Post } from '../interfaces/post.inteface';

@Injectable()
export class PostCardService {
  private postCardSource$: BehaviorSubject<Post | null> = new BehaviorSubject<Post | null>(null);
  postCard$: Observable<Post | null> = this.postCardSource$.asObservable();

  constructor() { }

  setPostCard(post: Post): void {
    this.postCardSource$.next(post);
  }
}
