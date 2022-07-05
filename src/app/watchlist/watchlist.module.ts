import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WatchlistComponent } from './watchlist.component';
import { MovieModule } from '../movie/movie.module';
import { MatCarouselModule } from '@ngmodule/material-carousel';
import { IvyCarouselModule } from 'angular-responsive-carousel';
import { MatDividerModule } from '@angular/material/divider';
import { RouterModule } from '@angular/router';
import { WatchlistCarouselComponent } from './watchlist-carousel/watchlist-carousel.component';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient } from '@angular/common/http';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';

export function HttpLoaderFactory(httpClient: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(httpClient);
}

@NgModule({
  declarations: [WatchlistComponent, WatchlistCarouselComponent],
  imports: [
    CommonModule,
    RouterModule,
    MovieModule,
    MatCarouselModule.forRoot(),
    MatDividerModule,
    IvyCarouselModule,
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
  ],
  exports: [WatchlistComponent, WatchlistCarouselComponent],
})
export class WatchlistModule {}
