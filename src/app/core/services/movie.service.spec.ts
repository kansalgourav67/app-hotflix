import { TestBed } from '@angular/core/testing';
import { Movie } from '../models/movie.interface';
import { MovieCategory } from '../models/movie-category.interface';
import { MovieService } from './movie.service';

describe('MovieService', () => {
  let service: MovieService;
  let movies: Movie[];

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MovieService);

    movies = [
      {
        id: 1,
        name: 'Top Gun 1',
        description: 'description test',
        title: 'Top Gun movie',
        isPrime: false,
        categoryId: [111],
        imageUrl: '',
        rating: 9.5,
        duration: 100,
        language: 'English',
        genre: 'Action',
      },
    ] as Movie[];
  });

  it('should be created successfully', () => {
    expect(service).toBeTruthy();
  });

  it('should retreive all movies successfully', () => {
    service.getMovies().subscribe((movies: Movie[]) => {
      expect(movies.length).toBeGreaterThan(0);
    });
  });

  it('should retreive movie successfully as per movie id', () => {
    const movie = service.getMovieById(1);
    expect(movie).toBeDefined();
    expect(movie.title).toBeDefined();
  });

  it('should retreive all categories successfully', () => {
    service.getAllCategories().subscribe((categories: MovieCategory[]) => {
      expect(categories.length).toBeGreaterThan(0);
    });
  });

  it('should retreive all movies successfully as per category id', () => {
    service.getMoviesByCategory(111).subscribe((movies: Movie[]) => {
      expect(movies.length).toBeGreaterThan(0);
    });
  });

  it('should add the movie successfully', () => {
    // arrange.
    movies[0].id = 99;

    // act.
    service.addMovie(movies[0]);

    // assert.
    const movie = service.getMovieById(99);
    expect(movie).toBeTruthy();
    expect(movie.id).toEqual(99);
    expect(movie.title).toEqual(movies[0].title);
  });
});
