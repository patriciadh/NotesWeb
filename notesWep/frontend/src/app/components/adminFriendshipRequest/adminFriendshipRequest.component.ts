import ObjectID from 'bson-objectid';

// Angular imports
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

// Other imports
import { User } from 'src/app/classes/user';
import { UserService } from 'src/app/services/user.service';
import { FriendRequest } from 'src/app/classes/friendRequest';
import { FriendRequestService } from 'src/app/services/friendRequest.service';

// Message
import Swal from 'sweetalert2';

@Component({
  selector: 'app-adminFriendshipRequest',
  templateUrl: './adminFriendshipRequest.component.html',
  styleUrls: ['./adminFriendshipRequest.component.css']
})
export class AdminFriendRequestComponent {
  // Properties
  user: User;
  variable:ObjectID;
  hoveredItem: string;
  requestsList: FriendRequest[]=[]
  emails:string[]=[]

  // Constructor
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private userService :UserService,
    private friendRequestService : FriendRequestService
  ) {}

  // Lifecycle hook
  ngOnInit(): void{

    // Get current user
    this.user = this.userService.getCurrentUser2()
    // Fetch friend requests for the current user
    this.getFriendRequests(this.user)

    // Initialize user
    this.user = {
      userType: "USER",
      name: '',
      surname: '',
      email: '',
      password: '',
      isEnable: true,
    };
  }
  
  // Method to fetch friend requests
  getFriendRequests(user:User){
    this.friendRequestService.getAll(user._id).subscribe((data: FriendRequest[]) => {
      this.requestsList = data; 
      this.getFriendEmail(this.requestsList)
    });
  }

  // Method to retrieve emails of users sending friend requests
  getFriendEmail(requestsList){
   if(requestsList.length > 0){
    for(let i=0;i<requestsList.length;i++){
      this.userService.get(this.requestsList[i].userId['$oid']).subscribe((data: User) => {
        this.emails[i]=data.email
      })
    }
   }
  }

  // Method to accept a friend request
  acceptFriendRequest(friendId: ObjectID,userId: ObjectID){
    this.friendRequestService.accept(friendId, userId).subscribe((response) => {
      console.log(response);
      Swal.fire({
        icon: 'success',
        title: 'Request accepted',
        text: 'New friend accepted!',
        showConfirmButton: false,
        timer: 2000
      })
      setTimeout(function() {
        window.location.reload();
      }, 2000);
    }, error => {
      console.log(error);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Impossible to accept the request.',
      });
    });
  }

  // Method to deny a friend request
  denyFriendRequest(friendId: ObjectID,userId: ObjectID){
    this.friendRequestService.deny(friendId, userId).subscribe((response) => {
      console.log(response);
      Swal.fire({
        icon: 'success',
        title: 'Request denied',
        text: 'The request was successfully denied.',
        showConfirmButton: false,
        timer: 2000
      })
      setTimeout(function() {
        window.location.reload();
      }, 2000);
      window.location.reload()
    }, error => {
      console.log(error);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Impossible to deny the request.',
      });
    });
  }
}