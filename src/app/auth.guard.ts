import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {AngularFireAuth} from 'angularfire2/auth';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(public afAuth: AngularFireAuth, private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.afAuth.authState
      .take(1)
      .map(value => {
        if (!value) {
          this.router.navigate(['/auth']);
          return false;
        } else if (value &&
          (!value.displayName || value.displayName === '')) {
          this.router.navigate(['/finish-profile']);
          return false;
        }
        return true;
      });
  }
}

@Injectable()
export class PreAuthGuard implements CanActivate {

  constructor(public afAuth: AngularFireAuth, private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.afAuth.authState
      .take(1)
      .map(value => {
        if (!value) {
          this.router.navigate(['/auth']);
          return false;
        } else if (value &&
          (!value.displayName || value.displayName === '')) {
          return true;
        }
        return false;
      });
  }
}

@Injectable()
export class UnauthedGuard implements CanActivate {

  constructor(public afAuth: AngularFireAuth) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.afAuth.authState
      .take(1)
      .map(value => !value);
  }
}

@Injectable()
export class AdminGuard implements CanActivate {

  constructor(public afAuth: AngularFireAuth) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return localStorage.getItem('admin') === 'true';
  }
}
