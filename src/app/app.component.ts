import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromRoot from './store';
import * as fromDictionaries from './store/dictionaries';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  title = 'app-ng-ecommerce';
  constructor(private readonly store: Store<fromRoot.State>) {}

  ngOnInit(): void {
    this.store.dispatch(new fromDictionaries.Read());
  }
}
