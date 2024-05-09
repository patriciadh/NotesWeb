import ObjectID from 'bson-objectid';

// Angular imports
import { Component } from '@angular/core';

// Other imports
import { User } from 'src/app/classes/user';
import { UserService } from 'src/app/services/user.service';
import { SendRequestService } from 'src/app/services/sendRequest.service';

// Message
import Swal from 'sweetalert2';

@Component({
  selector: 'app-adminSendRequest',
  templateUrl: './adminSendRequest.component.html',
  styleUrls: ['./adminSendRequest.component.css']
})

export class AdminSendRequestComponent {
  // Properties
  variable:ObjectID;
  user: User;
  users:User[]=[];

  constructor(
    private sendRequestService : SendRequestService,
    private userService :UserService
  ) {}

  // Lifecycle hook
  ngOnInit(): void{

    // Get current user
    this.user = this.userService.getCurrentUser2()
    this.variable=this.user._id
    // Fetch friends of the current user
    this.getFriends(this.user)

    // Initialize user
    this.user = {
      userType: "USER",
      name: '',
      surname: '',
      email: '',
      password: '',
      isEnable: true
    };
  }

  // Method to fetch friends of the current user
  getFriends(user:User){
    this.sendRequestService.getAllFriends(user._id).subscribe((data: User[]) => {
      this.users = data; 
      console.log(this.users)
    });

  }

  // Method to send a friend request
  sendRequest(userId:ObjectID,friendId:ObjectID){
    this.sendRequestService.sendRequest(userId,friendId).subscribe((response) => {
      Swal.fire({
        icon: 'success',
        title: 'Request sent',
        text: 'Your request was sent successfully.',
        showConfirmButton: false,
        timer: 2000
      })
      console.log(response);
    }, error => {
      console.log(error);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Impossible to send your request.',
      });
    });
  }
}