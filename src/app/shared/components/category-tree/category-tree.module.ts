import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CategoryTreeComponent } from './category-tree.component';

@NgModule({
  declarations: [CategoryTreeComponent],
  imports: [
    CommonModule,
    MatSnackBarModule,
    MatIconModule,
    MatBadgeModule,
    MatButtonModule,
    FlexLayoutModule,
    MatToolbarModule,
    MatMenuModule,
  ],
  exports: [CategoryTreeComponent],
})
export class CategoryTreeModule {}
