import ObjectID from 'bson-objectid';

// Angular imports
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

// Other imports
import { User } from 'src/app/classes/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-usersList',
  templateUrl: './usersList.component.html',
  styleUrls: ['./usersList.component.scss']
})

export class ListUsersComponent implements OnInit{

  // Properties
  variable:string;
  userList: User[]
  hoveredItem: string;
  user: User;

  constructor(
    private userService: UserService,
    private router: Router
  ) {}

  // Admin user
  userAdmin = {
    id: new ObjectID('66255cbf7d9a7331986307ee'),
    userType: "ADMIN",
    name: "admin",
    surname: "admin",
    email: "admin@gmail.com",
    password: "Admin1*",
    isEnable: true
  } as User

  // Lifecycle hook
  ngOnInit(): void{
    this.user = this.userService.getCurrentUser()
    this.variable=this.user.name
    this.getUsers()
    this.user = {
      userType: "USER",
      name: '',
      surname: '',
      email: '',
      password: '',
      isEnable: true
    };
  }

  // Method to navigate to user profile
  showUser(user){
    this.userService.saveCurrentUser2(user)
    console.log(`user/profile/${user._id['$oid']}`)
    this.router.navigate([`adminFriendshipsMenu`]);
  }

  // Method to format date
  formatDate(date: Date) {
    let formattedDate = date.toString().substring(0,10);
    return formattedDate
  }

  // Method to get list of users
  getUsers(){
    this.userService.getAllUsers().subscribe({
      next: (data) => {
        this.userList = data
      },
      error: (error) => {
        console.log(error)
      }
    });
  }
}