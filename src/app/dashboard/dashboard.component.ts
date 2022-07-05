import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import shuffle from 'shuffle-array';
import { Movie } from '../core/models/movie.interface';
import { AuthenticationService } from '../core/services/authentication.service';
import { MovieService } from '../core/services/movie.service';
import { ToastService } from '../core/services/toast.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  public movies: Movie[] = [];
  public searchText = '';
  public searchPerformed = false;
  public isLoading = false;
  public categoryId: number;
  public moviesCount: any = {
    totalMovies: this.movies.length,
  };
  public p = 1;
  public paginationResponsive = true;
  public categorySelected = '';

  constructor(
    private movieService: MovieService,
    private router: Router,
    private authService: AuthenticationService,
    private toastService: ToastService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.searchPerformed = false;
    // filter by category or on based on search.
    let filterType: string;
    let filterValue: string;
    this.activatedRoute.url.subscribe((url) => {
      filterType = url[0]?.path;
      filterValue = url[1]?.path;

      switch (filterType) {
        case 'search':
          this.searchPerformed = true;
          this.getAllMovies();
          this.searchText = filterValue.trim();
          break;
        case 'category':
          this.categoryId = +filterValue;
          this.getMoviesByCategory();
          this.searchText = '';
          break;
        case 'prime-movies':
          this.getPrimeMovies();
          this.categorySelected = 'Prime Movies';
          break;
        default:
          this.getAllMovies();
          this.searchText = '';
      }
    });
  }

  public navigateToMovieDetails(movie: Movie): void {
    const isAdminUser = this.authService.getAuthenticatedUser()?.isAdmin;
    if (isAdminUser) {
      this.toastService.showToastMessage(
        'Login as normal user to see movie details',
        'mat-warn'
      );
    } else {
      this.router.navigate(['/movie-details', movie.id]);
    }
  }

  private getAllMovies(): void {
    this.movies = [];
    this.movieService.getMovies().subscribe((movies: Movie[]) => {
      console.log('movies ', movies);
      this.movies = movies;
      this.moviesCount.totalMovies = this.movies.length;
      shuffle(this.movies);
    });
  }

  private getPrimeMovies(): void {
    this.movies = [];
    this.movieService.getMovies().subscribe((movies: Movie[]) => {
      this.movies = movies.filter((m: Movie) => m.isPrime === true);
      this.moviesCount.totalMovies = this.movies.length;
      shuffle(this.movies);
    });
  }

  private getMoviesByCategory(): void {
    this.movies = [];
    this.movieService
      .getMoviesByCategory(this.categoryId)
      .subscribe((movies: Movie[]) => {
        this.movies = movies;
        this.moviesCount.totalMovies = this.moviesCount.length;
      });
  }
}
