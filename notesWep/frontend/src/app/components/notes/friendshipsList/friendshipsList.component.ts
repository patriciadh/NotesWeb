import ObjectID from 'bson-objectid';

// Angular imports
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

// Other imports
import { User } from 'src/app/classes/user';
import { UserService } from 'src/app/services/user.service';
import { Note } from 'src/app/classes/note';
import { NoteService } from '../../../services/note.service';
import { Friendship } from 'src/app/classes/friendship';
import { FriendshipService } from 'src/app/services/friendship.service';

// Message
import Swal from 'sweetalert2';

@Component({
  selector: 'app-friendshipsList',
  templateUrl: './friendshipsList.component.html',
  styleUrls: ['./friendshipsList.component.css']
})

export class FriendListComponent {

  // Properties
  note: Note;
  user: User;
  friends:User[]=[];
  friendships:Friendship[]=[];
  variable:ObjectID;
  email:String;

  constructor(
    private route: ActivatedRoute,
    private userService :UserService,
    private noteService : NoteService,
    private friendshipService : FriendshipService
  ) {}

  ngOnInit(): void{
    
    // Initialize component
    this.user = this.userService.getCurrentUser()
    this.variable=this.user._id
    this.email=this.user.email
    const note_id = this.route.snapshot.paramMap.get('id');
    this.getNote(note_id)
    this.getFriendships(this.variable)
    this.user = {
      userType: "USER",
      name: '',
      surname: '',
      email: '',
      password: '',
      isEnable: true
    };
  }

  // Retrieves a note by ID
  getNote(id: string){
    this.noteService.get(id).subscribe({
      next: (data) => {
        this.note = data
      },
      error: (error) => {
        console.log(error)
      }
    });
  }

  // Shares a note with a friend
  shareNote(userId:ObjectID, friend: ObjectID){
    console.log(this.note)
    this.noteService.share(userId, friend, this.note._id).subscribe({
      next: (data) => {
        console.log(data)
        Swal.fire({
          icon: 'success',
          title: 'Note shared',
          text: 'Your note has been shared successfully.',
          showConfirmButton: false,
          timer: 2000
        });
      },
      error: (error) => {
        console.log(error)
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Impossible to share your note.',
        });
      }
    });
  }

  // Retrieves friendships for the current user
  getFriendships(userId:ObjectID){
    this.friendshipService.getAll(userId).subscribe((data: Friendship[]) => {
      this.friendships = data;
      console.log(this.variable)
      this.getFriends(this.friendships)
    });
  }

  // Retrieves friend details for each friendship
  getFriends(friendships:Friendship[]){
    if(friendships.length > 0){
      for(let i=0;i<friendships.length;i++){
        this.userService.get(this.friendships[i].friendId['$oid']).subscribe((data) => {
          this.friends[i]=data
          console.log(this.friends)
        })
      }
    }
  }
}