import ObjectID from 'bson-objectid';

// Angular imports
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

// Other imports
import { User } from 'src/app/classes/user';
import { UserService } from 'src/app/services/user.service';
import { Friendship } from 'src/app/classes/friendship';
import { FriendshipService } from 'src/app/services/friendship.service';
import { Note } from 'src/app/classes/note';
import { Note_Collection } from 'src/app/classes/noteCollection';
import { NoteService } from '../../../services/note.service';

// Message
import Swal from 'sweetalert2';

@Component({
  selector: 'app-friendsListCollections',
  templateUrl: './friendsListCollections.component.html',
  styleUrls: ['./friendsListCollections.component.css']
})

export class FriendListCollectionsComponent {

  // Properties
  user: User;
  email:String;
  variable:ObjectID;
  note: Note;
  note_collection_id:String;
  note_collection: Note_Collection;
  note_list: Note[];
  friends:User[]=[];
  friendships:Friendship[]=[];

  constructor(
    private route: ActivatedRoute,
    private userService :UserService,
    private noteService : NoteService,
    private friendshipService : FriendshipService  
  ) {}

  ngOnInit(): void{

    // Initialize component
    this.user = this.userService.getCurrentUser()
    this.email=this.user.email
    this.variable=this.user._id
    this.note_collection_id = this.route.snapshot.paramMap.get('id')
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

  // Retrieves a collection by ID
  getCollection(id: string){
    this.noteService.get_collection(id).subscribe({
      next: (data) => {
        this.note_collection = data.notes_collection
        this.note_list = data.notes
      },
      error: (error) => {
        console.log(error)
      }
    });
  }

  // Shares a collection with a friend
  shareCollection(userId:ObjectID, friend: ObjectID){
    console.log(this.note_collection_id)
    this.noteService.shareCollection(userId, friend, this.note_collection_id).subscribe({
      next: (data) => {
        console.log(data)
        Swal.fire({
          icon: 'success',
          title: 'Collection shared',
          text: 'Your collection has been shared successfully',
          showConfirmButton: false,
          timer: 2000
        });
      },
      error: (error) => {
        console.log(error)
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Impossible to share your collection.',
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
        })
      }
    }
  }
}