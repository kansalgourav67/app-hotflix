import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Movie } from 'src/app/core/models/movie.interface';
import { User, UserPreferences } from 'src/app/core/models/user.interface';
import { AppService } from 'src/app/core/services/app.service';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { MovieService } from 'src/app/core/services/movie.service';
import { PrimeSubscriptionService } from 'src/app/core/services/prime-subscription.service';
import { ToastService } from 'src/app/core/services/toast.service';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.scss'],
})
export class MovieDetailsComponent implements OnInit {
  public movie: Movie;
  public isLoading = false;
  public isUserAuthenticated = false;
  private user: User;
  // UserPreferences stores all the user preferences like favorite movies, watched movies, watch later.
  public userPreferences: UserPreferences;

  public get movieDuration(): string {
    const minutes = this.movie.duration % 60;
    const hours = (this.movie.duration - minutes) / 60;

    return `${hours} hrs ${minutes} min`;
  }

  public get isMarkedFavorite(): boolean {
    return this.userPreferences?.isFavorite;
  }

  public get isMarkedWatchLater(): boolean {
    return this.userPreferences?.watchLater;
  }

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private movieService: MovieService,
    private authService: AuthenticationService,
    private userService: UserService,
    private toastService: ToastService,
    private primeSubscriptionService: PrimeSubscriptionService,
    private appService: AppService
  ) {}

  ngOnInit(): void {
    const id = +(this.route.snapshot.paramMap.get('id') as string);
    this.movie = this.movieService.getMovieById(id);
    this.getUserAndPreferences();
  }

  public watchNowClickedEvent(): void {
    this.appService.isLoading(true);

    setTimeout(() => {
      this.watchMovie();
      this.appService.isLoading(false);
    }, 2500);
  }

  public toggleWatchLater(): void {
    this.appService.isLoading(true);

    setTimeout(() => {
      if (this.isUserLoggedIn()) {
        // set the status of movie to watch later.
        this.userPreferences =
          this.userPreferences ?? this.initializeUserPreference();
        this.userPreferences.watchLater = !this.userPreferences.watchLater;
        this.updateUserPreferences(
          this.userPreferences,
          this.userPreferences.watchLater
            ? 'Added to watch later'
            : 'Removed from watch later'
        );
      } else {
        this.navigateToLoginPage();
      }
      this.appService.isLoading(false);
    }, 1500);
  }

  public toggleFavorite(): void {
    this.appService.isLoading(true);

    setTimeout(() => {
      if (this.isUserLoggedIn()) {
        // set the status of movie to favorite.
        this.userPreferences =
          this.userPreferences ?? this.initializeUserPreference();
        this.userPreferences.isFavorite = !this.userPreferences?.isFavorite;
        this.updateUserPreferences(
          this.userPreferences,
          this.userPreferences.isFavorite
            ? 'Added to favorites'
            : 'Removed from favorites'
        );
      } else {
        this.navigateToLoginPage();
      }

      this.appService.isLoading(false);
    }, 1500);
  }

  private getUserAndPreferences(): void {
    this.isLoading = true;
    this.isUserAuthenticated = this.isUserLoggedIn();
    if (this.isUserAuthenticated) {
      this.user = this.authService.getAuthenticatedUser();
      this.userService
        .getUserPreferenceByMovieId(this.movie.id, this.user)
        .subscribe((userPreference: UserPreferences) => {
          this.userPreferences = userPreference;
          this.isLoading = false;
        });
    }
  }

  private updateUserPreferences(
    preference: UserPreferences,
    toastMessage: string
  ): void {
    this.userService
      .updateUserPreference(preference)
      .subscribe((updatedPreference: UserPreferences) => {
        this.userPreferences = updatedPreference;
        this.toastService.showToastMessage(toastMessage, 'mat-accent');
      });
  }

  private isUserLoggedIn(): boolean {
    return this.authService.isAuthenticated();
  }

  private navigateToLoginPage(): void {
    this.toastService.showToastMessage(
      'Please login to continue',
      'mat-accent'
    );
    this.router.navigateByUrl('login');
  }

  private initializeUserPreference(): UserPreferences {
    return {
      userId: this.user.emailId,
      movieId: this.movie.id,
      isFavorite: false,
      watchLater: false,
      watched: false,
    } as UserPreferences;
  }

  private watchMovie(): void {
    if (this.isUserLoggedIn()) {
      if (
        this.movie.isPrime &&
        !this.primeSubscriptionService.hasUserPrimeSubscription(this.user)
      ) {
        this.toastService.showToastMessage(
          'Prime membership is required to watch this content',
          'mat-warn'
        );
      } else {
        // set the status of movie to watched.
        this.userPreferences =
          this.userPreferences ?? this.initializeUserPreference();
        this.userPreferences.watched = true;
        this.updateUserPreferences(
          this.userPreferences,
          'Watched successfully'
        );
      }
    } else {
      this.navigateToLoginPage();
    }
  }
}
