import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NotificationComponent } from '../components/notification.component';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  constructor(private readonly _snackBar: MatSnackBar) { }

  public error(message: string): void {
    this._snackBar.openFromComponent(NotificationComponent, {
      duration: 3000,
      data: { message },
      panelClass: ['mat-snackbar_error']
    })
  }

  public success(message: string): void {
    this._snackBar.openFromComponent(NotificationComponent, {
      duration: 3000,
      data: { message },
      panelClass: ['mat-snackbar_success']
    })
  }
}
