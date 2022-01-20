import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '@app/store/user';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  @Input() isAuthorized!: boolean | null;
  @Output() signOut;
  @Input() user!: User | null;

  constructor(private readonly _router: Router) {
    this.signOut = new EventEmitter<void>();
  }

  public onSignOut(): void {
    this.signOut.emit();
  }

  public onProfileNavigate(): void {
    const path: string = this.user ? this.user.uid : 'new';

    this._router.navigate(['/profile', path]);
  }
}
