import ObjectID from 'bson-objectid';

// Angular imports
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

// Other imports
import { User } from 'src/app/classes/user';
import { UserService } from 'src/app/services/user.service';

// Message
import Swal from 'sweetalert2';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})

export class UsersComponent implements OnInit{

  // Properties
  user: User;
  user_list: User[];
  variable:string;
  hovered_item: string;

  constructor(
    private router: Router,
    private userService: UserService
  ) {}

  // User Admin object with default values
  userAdmin = {
    id: new ObjectID('66255cbf7d9a7331986307ee'),
    userType: "ADMIN",
    name: "admin",
    surname: "admin",
    email: "admin@gmail.com",
    password: "Admin1*",
    isEnable: true
  } as User

  // Component initialization
  ngOnInit(): void{

    // Get current user and set variable
    this.user = this.userService.getCurrentUser()
    this.variable=this.user.name
    // Fetch users
    this.getAllUsers()
    // Initialize user object
    this.user = {
      userType: "USER",
      name: '',
      surname: '',
      email: '',
      password: '',
      isEnable: true
    };
  }

  // Method to set the hovered item
  setHoveredItem(item: string) {
    this.hovered_item = item;
  }

  // Method to fetch users from the service
  getAllUsers(){
    this.userService.getAllUsers().subscribe({
      next: (data) => {
        this.user_list = data
      },
      error: (error) => {
        console.log(error)
      }
    });
  }

  // Method to navigate to user profile
  showUserProfile(user){
    console.log(`user/profile/${user._id['$oid']}`)
    this.router.navigate([`user/profile/${user._id['$oid']}`]);
  }

  // Method to format date
  formatDate(date: Date) {
    let formattedDate = date.toString().substring(0,10);
    return formattedDate
  }

  // Method to make a user Admin type
  makeAdmin(user: User) {
    console.log(user._id['$oid'])
    this.userService.makeAdmin(user._id).subscribe({
      next: (data) => {
        this.getAllUsers()
        Swal.fire({
          icon: 'success',
          title: 'User type successfully changed',
          text: 'The user type was changed successfully.',
          showConfirmButton: false,
          timer: 2000
        });
      },
      error: (error) => {
        console.log(error)
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Impossible to change the user type.',
        });
      }
    });
  }

  // Method to make a user User type
  makeUser(user: User) {
    console.log(user._id['$oid'])
    this.userService.makeUser(user._id).subscribe({
      next: (data) => {
        this.getAllUsers()
        Swal.fire({
          icon: 'success',
          title: 'User type successfully changed',
          text: 'The user type was changed successfully.',
          showConfirmButton: false,
          timer: 2000
        });
      },
      error: (error) => {
        console.log(error)
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Impossible to change the user type.',
        });
      }
    });
  }
}