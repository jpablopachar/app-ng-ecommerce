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
import { Roles } from '@app/store/user';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map, take, tap } from 'rxjs/operators';

export { Roles } from '@app/store/user';

type Role = Roles.Employee | Roles.Recruiter | any;

export interface GuardData {
  roles: Role[];
}

@Injectable({
  providedIn: 'root',
})
export class RoleGuard implements CanActivate, CanActivateChild, CanLoad {
  constructor(private router: Router, private store: Store<fromRoot.State>) {}

  private check(allowedRoles: string[]): Observable<boolean> {
    return this.store.pipe(select(fromUser.getUser)).pipe(
      take(1),
      map((user): boolean => {
        return allowedRoles.includes(user?.roleId ? user.roleId : '');
      }),
      tap((isAllowed: boolean): void => {
        if (!isAllowed) {
          this.router.navigate(['/']);
        }
      })
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
    return this.check(route.data['roles']);
  }

  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.check(childRoute.data['roles']);
  }

  canLoad(
    route: Route,
    segments: UrlSegment[]
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.check(route.data ? route.data['roles'] : []);
  }
}
