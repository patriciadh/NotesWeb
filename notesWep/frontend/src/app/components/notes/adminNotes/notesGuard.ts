import { Injectable } from '@angular/core';
import { UrlTree, Router } from '@angular/router';

import { UserService } from '../../../services/user.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class NotesGuard  {

  user = this.userService.getCurrentUser()
  constructor(private router: Router, private userService: UserService) {}

  // Guards access to routes based on user type
  canActivate(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if (this.user.userType === 'ADMIN') {
        return true;
      } else {
        this.router.navigate(['../']);
        return false;
      }
    }
}