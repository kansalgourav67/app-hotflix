import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import * as Users from '../../../assets/mock-data/user.json';
import { User, UserPreferences } from '../models/user.interface';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private users = (Users as any).default;

  constructor() {}

  public isUserExists(emailId: string): boolean {
    const user = this.users.find((u: any) => u.emailId === emailId);
    return user !== null;
  }

  public getUserByEmailId(emailId: string): User {
    const user = this.users.find((u: any) => u.emailId === emailId) as User;
    return user;
  }

  public getUserPreferences(): Observable<UserPreferences[]> {
    const preferences = this.getUserPreferencesFromLocalStorage();
    return of(preferences);
  }

  public getUserPreferenceByMovieId(
    movieId: number,
    user: User
  ): Observable<UserPreferences> {
    const userPreference = this.getUserPreferencesFromLocalStorage();
    if (!userPreference) {
      return of();
    }
    const response = userPreference.find(
      (p: UserPreferences) => p.movieId === movieId && p.userId === user.emailId
    ) as UserPreferences;
    return of(response);
  }

  public updateUserPreference(
    userPreference: UserPreferences
  ): Observable<UserPreferences> {
    const userPreferences = this.getUserPreferencesFromLocalStorage();
    if (!userPreferences) {
      this.updateUserPreferencesInLocalStorage([userPreference]);
      return of(userPreference);
    }

    let response = userPreferences.find(
      (p: UserPreferences) =>
        p.movieId === userPreference.movieId &&
        p.userId === userPreference.userId
    ) as UserPreferences;

    if (!response) {
      userPreferences.push(userPreference);
    } else {
      response.isFavorite = userPreference.isFavorite;
      response.watchLater = userPreference.watchLater;
      response.watched = userPreference.watched;
    }

    this.updateUserPreferencesInLocalStorage(userPreferences);

    return of(userPreference);
  }

  private getUserPreferencesFromLocalStorage(): UserPreferences[] {
    const preferences = localStorage.getItem('preferences') as string;
    return JSON.parse(preferences) as UserPreferences[];
  }

  private updateUserPreferencesInLocalStorage(
    userPreferences: UserPreferences[]
  ): void {
    localStorage.setItem('preferences', JSON.stringify(userPreferences));
  }
}
