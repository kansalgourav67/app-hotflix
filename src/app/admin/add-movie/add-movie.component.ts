import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Movie } from 'src/app/core/models/movie.interface';
import { MovieService } from 'src/app/core/services/movie.service';
import { ToastService } from 'src/app/core/services/toast.service';

@Component({
  selector: 'app-add-movie',
  templateUrl: './add-movie.component.html',
  styleUrls: ['./add-movie.component.scss'],
})
export class AddMovieComponent implements OnInit {
  public form: FormGroup;
  public imageUrl: string =
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQubAUOPoCA0tRK7-t7e0hCujgTHzBpZFK0Aw&usqp=CAU';
  public position = new FormControl('above');
  public isPrime: boolean = false;

  constructor(
    private fb: FormBuilder,
    private movieService: MovieService,
    private router: Router,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  private initializeForm(): void {
    this.form = this.fb.group({
      name: ['', [Validators.required]],
      title: ['', [Validators.required]],
      description: ['', [Validators.required]],
      language: ['English', [Validators.required]],
      genre: ['', [Validators.required]],
      imdbRating: [
        '',
        [Validators.required, Validators.min(0), Validators.max(10)],
      ],
      duration: ['', [Validators.required, Validators.min(0)]],
    });
  }

  public onSubmit(): void {
    const { name, description, title, language, genre, imdbRating, duration } =
      this.form.value;
    const movie: Movie = {
      id: this.getRandomMovieId(),
      name: name,
      description: description,
      title: title,
      language: this.getMovieLanguage(language),
      genre: genre,
      rating: imdbRating,
      duration: duration,
      isPrime: this.isPrime,
      imageUrl: this.imageUrl,
      categoryId: [],
    };

    try {
      this.movieService.addMovie(movie);
      this.toastService.showToastMessage('Added successfully', 'mat-accent');
      this.router.navigateByUrl('');
    } catch (ex) {
      this.toastService.showToastMessage(
        'Error occured. Please try again',
        'mat-warn'
      );
    }
  }

  private getRandomMovieId(): number {
    // id is calculated on the base of the seconds that elapsed since 1 Jan 1970. (reference taken from google).
    return Math.round(new Date().getTime() / 1000);
  }

  private getMovieLanguage(language: string): string {
    return language === 'Both' ? 'English/Hindi' : language;
  }
}
