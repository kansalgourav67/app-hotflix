import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  private isLoadingSub = new Subject<boolean>();
  public isLoading$ = this.isLoadingSub.asObservable();

  public isLoading(value: boolean): void {
    this.isLoadingSub.next(value);
  }
}
