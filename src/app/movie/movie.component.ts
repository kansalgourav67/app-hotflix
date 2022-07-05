import { Component, Input, OnInit } from '@angular/core';
import { Movie } from '../core/models/movie.interface';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.scss'],
})
export class MovieComponent implements OnInit {
  @Input()
  public movie: Movie;

  public get movieDescriptionText(): string {
    return `${this.movie.genre}/${this.movie.language}`;
  }

  constructor() {}

  ngOnInit(): void {}
}
