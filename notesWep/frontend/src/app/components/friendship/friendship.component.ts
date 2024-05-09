import ObjectID from 'bson-objectid';

// Angular imports
import { Component } from '@angular/core';

// Other imports
import { User } from 'src/app/classes/user';
import { UserService } from 'src/app/services/user.service';
import { Friendship } from 'src/app/classes/friendship';
import { FriendshipService } from 'src/app/services/friendship.service';

@Component({
  selector: 'app-friendship',
  templateUrl: './friendship.component.html',
  styleUrls: ['./friendship.component.css']
})

export class FriendshipComponent {
  
  // Properties
  variable:ObjectID;
  user: User;
  email:String;
  friends:User[]=[]
  friendShips:Friendship[]=[]
  friends2:User[]=[]

  constructor(
    private friendshipService : FriendshipService,
    private userService :UserService
  ) {}

  // Lifecycle hook
  ngOnInit(): void{
    // Get current user
    this.user = this.userService.getCurrentUser()
    this.variable=this.user._id
    this.email=this.user.email
    // Fetch friendships for the current user
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

  // Method to retrieve friends' details for a user
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