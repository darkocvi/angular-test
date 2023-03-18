import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  private loadingSource$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  isLoading$: Observable<boolean> = this.loadingSource$.asObservable();

  constructor() { }

  setLoadingState(isLoading: boolean): void {
    this.loadingSource$.next(isLoading);
  }
}
