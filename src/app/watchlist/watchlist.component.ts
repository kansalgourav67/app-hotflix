import { Component, OnInit } from '@angular/core';
import { Movie } from '../core/models/movie.interface';
import { UserPreferences } from '../core/models/user.interface';
import { MovieService } from '../core/services/movie.service';
import { UserService } from '../core/services/user.service';

@Component({
  selector: 'app-watchlist',
  templateUrl: './watchlist.component.html',
  styleUrls: ['./watchlist.component.scss'],
})
export class WatchlistComponent implements OnInit {
  public favoriteMovies: Movie[] = [];
  public watchedMovies: Movie[] = [];
  public watchLaterMovies: Movie[] = [];

  public get isWishlistEmpty(): boolean {
    return (
      this.favoriteMovies?.length < 1 &&
      this.watchLaterMovies?.length < 1 &&
      this.watchedMovies?.length < 1
    );
  }

  constructor(
    private userService: UserService,
    private movieService: MovieService
  ) {}

  ngOnInit(): void {
    this.getUserPreferences();
  }

  // User preferences includes all the favorite, watched, watch later movies/shows etc.
  private getUserPreferences(): void {
    this.userService
      .getUserPreferences()
      .subscribe((preferences: UserPreferences[]) => {
        this.handleUserPreferences(preferences);
      });
  }

  private handleUserPreferences(preferences: UserPreferences[]): void {
    if (!preferences || preferences.length < 1) {
      return;
    }
    // filter favorite movies.
    this.getFavoriteMovies(preferences);
    // filter watched movies.
    this.getWatchedMovies(preferences);
    // filter watch later movies.
    this.getWatchLaterMovies(preferences);
  }

  private getFavoriteMovies(preferences: UserPreferences[]): void {
    const favoritesPreferences = preferences.filter(
      (p: UserPreferences) => p.isFavorite === true
    );

    favoritesPreferences.forEach((fav) => {
      const movie = this.getMovieById(fav.movieId);
      this.favoriteMovies.push(movie);
    });
  }

  private getWatchedMovies(preferences: UserPreferences[]): void {
    const watchedPreferences = preferences.filter(
      (p: UserPreferences) => p.watched === true
    );

    watchedPreferences.forEach((fav) => {
      const movie = this.getMovieById(fav.movieId);
      this.watchedMovies.push(movie);
    });
  }

  private getWatchLaterMovies(preferences: UserPreferences[]): void {
    const watchedPreferences = preferences.filter(
      (p: UserPreferences) => p.watchLater === true
    );

    watchedPreferences.forEach((fav) => {
      const movie = this.getMovieById(fav.movieId);
      this.watchLaterMovies.push(movie);
    });
  }

  private getMovieById(id: number): Movie {
    return this.movieService.getMovieById(id);
  }
}
