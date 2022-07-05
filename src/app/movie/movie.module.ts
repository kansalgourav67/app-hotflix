import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MovieComponent } from './movie.component';
import { MatCardModule } from '@angular/material/card';
import { MovieDetailsComponent } from './movie-details/movie-details.component';
import { SharedModule } from '../shared/shared.module';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatListModule } from '@angular/material/list';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatDividerModule } from '@angular/material/divider';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatCarouselModule } from '@ngmodule/material-carousel';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';

@NgModule({
  declarations: [MovieComponent, MovieDetailsComponent],
  imports: [
    CommonModule,
    MatCardModule,
    MatGridListModule,
    CommonModule,
    MatChipsModule,
    SharedModule,
    MatListModule,
    FlexLayoutModule,
    MatDividerModule,
    MatSelectModule,
    MatButtonModule,
    MatCarouselModule,
    MatSnackBarModule,
    MatIconModule,
  ],
  exports: [MovieComponent, MovieDetailsComponent],
})
export class MovieModule {}
