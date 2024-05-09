// Angular imports
import { Injectable } from '@angular/core';
import { UrlTree, Router } from '@angular/router';

// Other imports
import { Observable } from 'rxjs';
import { UserService } from '../../services/user.service';

@Injectable({
  providedIn: 'root'
})

export class UsersGuard  {

  // Properties
  User = this.userService.getCurrentUser()

  constructor(private router: Router, private userService: UserService) {}

  canActivate(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.User.userType === 'ADMIN') {
        return true;
    } else {
      this.router.navigate(['../']);
      return false;
    }
  }
}