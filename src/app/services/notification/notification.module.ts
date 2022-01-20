import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { NotificationComponent } from './components/notification.component';
import { NotificationService } from './services/notification.service';

@NgModule({
  declarations: [NotificationComponent],
  imports: [CommonModule, MatSnackBarModule],
})
export class NotificationModule {
  static forRoot(): ModuleWithProviders<NotificationModule> {
    return {
      ngModule: NotificationModule,
      providers: [NotificationService],
    };
  }
}
