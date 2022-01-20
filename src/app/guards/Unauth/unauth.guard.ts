import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateChild,
  CanLoad,
  Route,
  Router,
  RouterStateSnapshot,
  UrlSegment,
  UrlTree
} from '@angular/router';
import * as fromRoot from '@app/store';
import * as fromUser from '@app/store/user';
import { select, Store } from '@ngrx/store';
import { filter, map, Observable, take, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UnauthGuard implements CanActivate, CanActivateChild, CanLoad {
  constructor(private _router: Router, private _store: Store<fromRoot.State>) {}

  private check(): Observable<boolean> {
    return this._store.pipe(select(fromUser.getUserState)).pipe(
      filter((state): boolean => !state.loading),
      take(1),
      tap((state): void => {
        if (state.uid) {
          this._router.navigate(['/']);
        }
      }),
      map((state): boolean => !state.uid)
    );
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.check();
  }
  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.check();
  }
  canLoad(
    route: Route,
    segments: UrlSegment[]
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.check();
  }
}
