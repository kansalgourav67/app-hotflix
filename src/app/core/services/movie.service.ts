import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import * as movies from '../../../assets/mock-data/movies.json';
import * as moviesCategories from '../../../assets/mock-data/movie-categories.json';
import { Movie } from '../models/movie.interface';
import { MovieCategory } from '../models/product-category.interface';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  private movies = (movies as any).default;
  private categoryList = (moviesCategories as any).default;

  constructor() {}

  public getMovies(): Observable<Movie[]> {
    return of(this.getAllMovies());
  }

  public getMovieById(id: number): Movie {
    return this.getAllMovies().find((m: any) => m.id === id) as Movie;
  }

  public getAllCategories(): Observable<MovieCategory[]> {
    return of(this.categoryList as MovieCategory[]);
  }

  public getMoviesByCategory(categoryId: number): Observable<Movie[]> {
    return of(
      this.movies.filter((m: any) =>
        m.categoryId.some((c: any) => c === categoryId)
      ) as Movie[]
    );
  }

  public addMovie(movie: Movie): void {
    // movies added by the admin would be saved in local storage and when getting all movies from above method then these will also be considered.
    // as we are storing movies that is static in json files.
    let movieItems = localStorage.getItem('movies') as string;
    let movies = (JSON.parse(movieItems) as Movie[]) ?? [];
    movies.push(movie);
    localStorage.setItem('movies', JSON.stringify(movies));
  }

  private getAllMovies(): Movie[] {
    let movies = [...(this.movies as Movie[])];

    // verify if the movies are stored in localstorage(movies added by admin store in localstorage).
    const items = this.getMoviesFromLocalStorage();
    console.log('items from lcoa ', items);
    if (items) {
      movies.push(...items);
    }

    return movies;
  }

  private getMoviesFromLocalStorage(): Movie[] {
    const items = localStorage.getItem('movies') as string;
    return JSON.parse(items) as Movie[];
  }
}
