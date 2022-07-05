import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { PrimeSubscription, User } from '../models/user.interface';

@Injectable({
  providedIn: 'root',
})
export class PrimeSubscriptionService {
  private primeSubscriptionSubject = new Subject<boolean>();
  public optInPrimeSubscription$ = this.primeSubscriptionSubject.asObservable();

  constructor() {}

  public takePrimeSubscription(subscription: PrimeSubscription): void {
    const data = JSON.stringify(subscription);
    localStorage.setItem('membership', data);

    this.primeSubscriptionSubject.next(true);
  }

  public hasUserPrimeSubscription(user: User): boolean {
    const data = localStorage.getItem('membership') as string;
    if (!data) {
      return false;
    }
    const subscription = JSON.parse(data) as PrimeSubscription;
    if (subscription?.emailId === user.emailId) {
      return subscription.primeSubscription;
    }
    return false;
  }

  public deactivateUserPrimeMembership(): void {
    localStorage.removeItem('membership');
    this.primeSubscriptionSubject.next(false);
  }
}
