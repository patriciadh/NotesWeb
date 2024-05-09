import ObjectID from 'bson-objectid';

// Angular import
import { Component } from '@angular/core';

// Other imports
import { User } from 'src/app/classes/user';
import { Friendship } from 'src/app/classes/friendship';
import { UserService } from 'src/app/services/user.service';
import { FriendshipService } from 'src/app/services/friendship.service';

@Component({
  selector: 'app-adminFriendships',
  templateUrl: './adminFriendships.component.html',
  styleUrls: ['./adminFriendships.component.css']
})

export class AdminFriendshipComponent {

  // Properties
  user: User;
  email:String;
  variable:ObjectID;
  friends:User[]=[]
  friends2:User[]=[]
  friendShips:Friendship[]=[]
  

  // Constructor
  constructor(
    private userService :UserService,
    private friendshipService : FriendshipService
  ) {}

  // Lifecycle hook
  ngOnInit(): void{
    // Initialize user
    this.user = this.userService.getCurrentUser2()
    this.variable=this.user._id
    this.email=this.user.email
    this.getFriendships(this.variable)
  }

  // Method to fetch friendships for a user
  getFriendships(userId:ObjectID){
    this.friendshipService.getAll(userId).subscribe((data: Friendship[]) => {
      this.friendShips = data; 
      console.log(this.variable)
      this.getFriends(this.friendShips)
      this.getFriends2(this.friendShips)
    });
  }

  // Method to retrieve friends for a user
  getFriends(friendShips:Friendship[]){
    if(friendShips.length > 0){
      for(let i=0;i<friendShips.length;i++){
        this.userService.get(this.friendShips[i].userId['$oid']).subscribe((data) => {
          this.friends[i]=data
        })
      }
    }
  }

  // Method to retrieve friends details for a user
  getFriends2(friendShips:Friendship[]){
    if(friendShips.length > 0){
      for(let i=0;i<friendShips.length;i++){
        this.userService.get(this.friendShips[i].friendId['$oid']).subscribe((data) => {
          this.friends2[i]=data
          console.log(this.friends2)
        })
      }
    }
  }
}