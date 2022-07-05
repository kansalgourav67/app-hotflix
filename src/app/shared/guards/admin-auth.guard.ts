import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import { AuthenticationService } from 'src/app/core/services/authentication.service';

@Injectable({
  providedIn: 'root',
})
export class AdminRoleAuthGuard implements CanActivate {
  constructor(
    private authService: AuthenticationService,
    private router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    if (!this.authService.isAuthenticated()) {
      this.router.navigateByUrl('login');
      return false;
    }

    const authenticatedUser = this.authService.getAuthenticatedUser();
    if (!authenticatedUser.isAdmin) {
      this.router.navigateByUrl('access-denied');
      return false;
    }

    return true;
  }
}
