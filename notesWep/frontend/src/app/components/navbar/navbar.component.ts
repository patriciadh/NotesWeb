import ObjectID from 'bson-objectid';

// Angular imports
import { Component, OnInit } from '@angular/core';

// Other imports
import { User } from '../../classes/user';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit{

  constructor(private userService: UserService) {}

  // Properties
  user = {
    id: new ObjectID('63ff2ff78726e31bd0e5589a'),
    name: "admin",
    surname: "admin",
    email: "admin@gmail.com",
    password: "admin123*",
    isEnable: true,
    userType: "admin",
  } as User

  // Lifecycle hook
  ngOnInit(): void{
    // Get current user
    this.user = this.userService.getCurrentUser()
    // Set admin menu visibility
    const admin_icon = document.getElementById('adminIcon');
    const admin_option = document.getElementById("adminMenuOption") as HTMLAnchorElement;
    const admin_span = document.getElementById('adminSpan');
    
    if(this.user.userType === "USER"){
      admin_option.style.display = 'none';
    } else {
      admin_option.style.display = 'inline-block';
      admin_option.classList.remove('disabled');
      admin_icon.style.opacity = '1';
      admin_span.style.opacity = '1';
    }
  }
}