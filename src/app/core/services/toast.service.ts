import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  constructor(private snackBar: MatSnackBar) {}

  public showToastMessage(message: string, type: string): void {
    this.snackBar.open(message, '', {
      horizontalPosition: 'end',
      verticalPosition: 'bottom',
      duration: 2000,
      panelClass: ['mat-toolbar', type],
    });
  }
}
