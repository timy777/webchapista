import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  private loadingSubject = new BehaviorSubject<boolean>(false);

  setLoading(value: boolean): void {
    this.loadingSubject.next(value);
  }

  getLoading(): BehaviorSubject<boolean> {
    return this.loadingSubject;
  }
}
