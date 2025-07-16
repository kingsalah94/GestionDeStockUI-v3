import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateFn,
  GuardResult,
  MaybeAsync, Router,
  RouterStateSnapshot
} from '@angular/router';
import {Injectable} from '@angular/core';
import {AuthService} from '../services/auth.service';

@Injectable()
export class authorizationGuard implements CanActivate {
  constructor(private authService: AuthService ,private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): MaybeAsync<GuardResult> {
   if (this.authService.iAuthenticate){
     let authUserRoles = this.authService.roles?? [];
     let requiredRoles = route.data['roles'];
     for (let role of requiredRoles){
       if (requiredRoles.includes(role)){
         return true;
       }
     }
     return false;
   }
   else {
     this.router.navigateByUrl("/login")
     return true;
   }
  }

}
