import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable()
export class ValidTokenGuard implements CanActivate {
  constructor(public router: Router) { }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      const app = environment.application
      const user = app.allUsers[sessionStorage.getItem("userId")]
      if (user.refreshToken==null) {
        const redirectUrl = '/login';
  
          // Redirect the user
          this.router.navigate([redirectUrl]);
        return false
      }
      else {
    return true;}
  }
}
