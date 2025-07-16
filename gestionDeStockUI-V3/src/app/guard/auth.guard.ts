import {
  ActivatedRouteSnapshot, CanActivate,
  CanActivateFn,
  GuardResult,
  MaybeAsync,
  Router,
  RouterStateSnapshot
} from '@angular/router';
import {Injectable} from '@angular/core';
import {AuthService} from '../services/auth.service';

@Injectable()
export class authGuard implements CanActivate {

  constructor(private router: Router, private authService: AuthService) {

  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): MaybeAsync<GuardResult> {
    if (this.authService.iAuthenticate){
      return true;
    }else {
      this.router.navigateByUrl("/login")
      return false;
    }
  }
}
