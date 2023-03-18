import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import { fromEvent, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, takeUntil } from 'rxjs/operators';
import { TableColumn, TableData } from "../types/types";

@Component({
  selector: 'glr-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableComponent<T = any> implements OnInit, OnChanges, AfterViewInit {
  @Input() columns: TableColumn<T>[] = [];
  @Input() data: T[] = [];
  @Input() haveActions: boolean = false;

  @Output() onEditItem: EventEmitter<any> = new EventEmitter<any>();
  @Output() onViewItem: EventEmitter<any> = new EventEmitter<any>();
  @Output() onRemoveItem: EventEmitter<any> = new EventEmitter<any>();
  @Output() onSortEmit: EventEmitter<{sortDirection: 'asc' | 'desc', 'sortColumn': keyof T}> = new EventEmitter<any>();
  @Output() onSearchChange: EventEmitter<string> = new EventEmitter<string>();

  @ViewChild('inputSearch', { static: true }) inputSearchEl!: ElementRef<HTMLInputElement>;

  tableRows: string[][] = [];
  sortColumn: keyof T | undefined;
  sortDirection: 'asc' | 'desc' = 'asc';

  private onDestroy$: Subject<boolean> = new Subject<boolean>();

  constructor() { }

  ngOnInit(): void {
    fromEvent(this.inputSearchEl.nativeElement, 'keyup').pipe(
      takeUntil(this.onDestroy$),
      debounceTime(1000),
      distinctUntilChanged(),
    ).subscribe((event: any) => {
      this.onSearchChange.emit(event.target.value);
    })
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes && changes.data) {
      this.tableRows = this.data.reduce((rows: string[][], row: T) => {
        return [
          ...rows,
          this.columns.map((column: TableColumn<T>) => {
            return column.render(row).toString();
          }),
        ];
      }, []);
    }
  }

  ngAfterViewInit(): void {
  }

  trackByRow(rowItem: any): number {
    return rowItem.id;
  }

  handleEditClick(item: any): void {
    this.onEditItem.emit(item);
  }

  handleViewClick(item: any): void {
    this.onViewItem.emit(item);
  }

  handleRemove(item: any): void {
    this.onRemoveItem.emit(item);
  }

  handleSorting(column: keyof T): void {
    this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    if (column) {
     this.sortColumn = column;
      this.onSortEmit.emit({ sortDirection: this.sortDirection, sortColumn: this.sortColumn });
    }
  }
}
