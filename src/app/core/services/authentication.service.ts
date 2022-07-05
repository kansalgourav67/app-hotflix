import { Injectable } from '@angular/core';
import { PrimeSubscription, User } from '../models/user.interface';
import * as user from '../../../assets/mock-data/user.json';
import { Subject } from 'rxjs';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  public authenticationChanged = new Subject<boolean>();
  public isAuthenticated$ = this.authenticationChanged.asObservable();
  private users = (user as any).default;

  constructor(private userService: UserService) {}

  public isAuthenticated(): boolean {
    const authenticatedUser = localStorage.getItem('emailId');
    return authenticatedUser !== null && authenticatedUser !== undefined;
  }

  public loginUser(emailId: string, password: string): boolean {
    // verify if user with provided emailid exists.
    const user = this.userService.getUserByEmailId(emailId);
    if (!user) {
      return false;
    }

    if (user.password === password) {
      localStorage.setItem('emailId', emailId);
      this.authenticationChanged.next(true);
      return true;
    }

    return false;
  }

  public logoutUser(user: User): void {
    localStorage.removeItem('emailId');
    this.authenticationChanged.next(false);
  }

  public getAuthenticatedUser(): User {
    const authenticatedUserEmailId = localStorage.getItem('emailId') as string;
    return this.userService.getUserByEmailId(authenticatedUserEmailId);
  }
}
