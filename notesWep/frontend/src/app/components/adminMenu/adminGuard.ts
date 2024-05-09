import { Injectable } from '@angular/core';
import { RouterStateSnapshot, ActivatedRouteSnapshot, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../../services/user.service';

@Injectable({
  providedIn: 'root'
})

export class AdminGuard  {

  constructor(private router: Router, private userService: UserService) {}

  // Property to hold current user
  user = this.userService.getCurrentUser()

  // Method to check if the user is ADMIN
  canActivate( next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.user.userType === 'ADMIN') {
      return true;
    } else {
      this.router.navigate(['../']);
      return false;
    }
  }
}