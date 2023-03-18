import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";

import { TableColumn } from "../../../../shared/types/types";
import { PostService } from "../../services/posts.service";
import { LoadingService } from "../../../../core/services/loading.service";
import { Post } from "../../interfaces/post.inteface";
import { PostCardService } from '../../services/post-card.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostsComponent implements OnInit, OnDestroy {
  private onDestroy$: Subject<boolean> = new Subject<boolean>();
  tableColumns: TableColumn<Post>[] = [
    {
      label: 'Id',
      render: (item: Post) => item.id.toString(),
      canSort: true,
      key: 'id',
    },
    {
      label: 'Title',
      render: (item: Post) => item.title,
      key: 'title',
      canSort: true,
    },
    {
      label: 'Body',
      render: (item: Post) => item.body,
      key: 'body',
    },
  ];
  tableData: Post[] = [];
  private tempTableData: Post[] = [];

  constructor(
    private readonly cdr: ChangeDetectorRef,
    private readonly router: Router,
    private readonly postService: PostService,
    private readonly loadingService: LoadingService,
    private readonly postCardService: PostCardService,
  ) { }

  ngOnInit(): void {
    this.postService.getPosts().pipe(takeUntil(this.onDestroy$)).subscribe((posts) => {
      this.tableData = posts;
      this.tempTableData = posts;
      this.cdr.markForCheck();
    });
  }

  ngOnDestroy() {
    this.onDestroy$.next(true);
    this.onDestroy$.complete();
  }

  handleEditItem(item: any): void {
    this.router.navigateByUrl(`/posts/${item.id}`);
  }

  handleRemoveItem(item: any): void {
    this.loadingService.setLoadingState(true);
    this.postService.removePost(item.id).pipe(takeUntil(this.onDestroy$)).subscribe(() => {
      this.tableData = this.tableData.filter((data) => data.id !== item.id);
      this.loadingService.setLoadingState(false);
      this.cdr.markForCheck();
    }, (error) => {
      this.loadingService.setLoadingState(false);
      alert('False to remove')
    });
  }

  handleSorting(event: { sortDirection: 'asc' | 'desc'; sortColumn: keyof Post }): void {
    this.tableData = [...this.tableData].sort((a, b) => {
      if (event.sortDirection === 'asc') {
        return a[event.sortColumn] < b[event.sortColumn] ? -1 : 1;
      }
      return a[event.sortColumn] > b[event.sortColumn] ? -1 : 1;
    });
    this.cdr.markForCheck();
  }

  handleSearch(keyword: string): void {
    if (!keyword) {
      this.tableData = this.tempTableData;
      return;
    }

    this.tableData = this.tempTableData.filter((item) => item.title.includes(keyword));
  }

  handleViewItem(event: Post): void {
    this.postCardService.setPostCard(event);
    this.router.navigateByUrl(`/posts/view/${event.id}`);
  }
}
