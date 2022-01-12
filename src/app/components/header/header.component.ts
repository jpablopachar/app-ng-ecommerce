import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  @Input() isAuthorized!: boolean; 
  @Output() signOut;

  constructor(private readonly _router: Router) {
    this.signOut = new EventEmitter<void>();
  }
}
