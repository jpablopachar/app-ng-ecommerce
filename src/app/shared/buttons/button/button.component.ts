import { Component, Input } from '@angular/core';

export type ButtonType = 'button' | 'submit';

@Component({
  selector: 'app-button',
  template: `<button class="app-button"><ng-content></ng-content></button>`,
})
export class ButtonComponent {
  @Input() type: ButtonType;

  constructor() {
    this.type = 'button';
  }
}
