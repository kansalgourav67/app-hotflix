import { NgModule } from '@angular/core';

import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NgxPaginationModule } from 'ngx-pagination';
import { AppRoutingModule } from '../app-routing.module';
import { DashboardComponent } from './dashboard.component';
import { MovieModule } from '../movie/movie.module';
import { MatChipsModule } from '@angular/material/chips';

@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    AppRoutingModule,
    MovieModule,
    SharedModule,
    MatCardModule,
    MatToolbarModule,
    Ng2SearchPipeModule,
    NgxPaginationModule,
    MatChipsModule,
  ],
  providers: [],
  exports: [DashboardComponent],
})
export class DashboardModule {}
