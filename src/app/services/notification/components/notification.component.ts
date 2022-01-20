import { Component, Inject } from '@angular/core';
import { MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';

export interface Notification {
  message: string;
}

@Component({
  selector: 'app-notification',
  template: ` <span>{{ notification.message }}</span> `
})
export class NotificationComponent {
  constructor(@Inject(MAT_SNACK_BAR_DATA) public notification: Notification) {}
}
