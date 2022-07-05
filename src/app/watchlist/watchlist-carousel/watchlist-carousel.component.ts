import { Component, Input, OnInit } from '@angular/core';
import { Movie } from 'src/app/core/models/movie.interface';

@Component({
  selector: 'app-watchlist-carousel',
  templateUrl: './watchlist-carousel.component.html',
  styleUrls: ['./watchlist-carousel.component.scss'],
})
export class WatchlistCarouselComponent implements OnInit {
  @Input()
  public movies: Movie[];

  constructor() {}

  ngOnInit(): void {}
}
