import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { AppRoutingModule } from '../app-routing.module';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { CategoryTreeComponent } from './components/category-tree/category-tree.component';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CategoryTreeModule } from './components/category-tree/category-tree.module';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { PrimeMembershipDialogComponent } from './components/prime-membership-dialog/prime-membership-dialog.component';

@NgModule({
  declarations: [
    NavBarComponent,
    SearchBarComponent,
    PrimeMembershipDialogComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    AppRoutingModule,
    MatSnackBarModule,
    TranslateModule,
    MatInputModule,
    MatSelectModule,
    CategoryTreeModule,
    MatDialogModule,
  ],
  providers: [],
  exports: [
    TranslateModule,
    NavBarComponent,
    SearchBarComponent,
    PrimeMembershipDialogComponent,
  ],
})
export class SharedModule {}
