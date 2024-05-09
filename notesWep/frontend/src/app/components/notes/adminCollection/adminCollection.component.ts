import ObjectID from 'bson-objectid';

// Angular imports
import { Router } from '@angular/router';
import { Component } from '@angular/core';

// Other imports
import { User } from 'src/app/classes/user';
import { UserService } from 'src/app/services/user.service';
import { NoteService } from 'src/app/services/note.service';
import { noteColors } from 'src/app/interfaces/colours';
import { Note_Collection } from 'src/app/classes/noteCollection';

@Component({
  selector: 'app-adminCollection',
  templateUrl: './adminCollection.component.html',
  styleUrls: ['./adminCollection.component.scss']
})

export class CollectionAdminComponent {

  constructor(private noteService: NoteService, private userService: UserService, private router: Router) { }

  // Properties
  hovered_item: string;
  user: User;
  user_dictionary: { [id: string]: string } = {};
  note_collection: Note_Collection;
  note_collection_list: Note_Collection[] = [];
  colorList: string[] = Object.values(noteColors);

  // Lifecycle hook
  ngOnInit(): void {
    this.user = this.userService.getCurrentUser()
    this.getAllCollections()
    this.note_collection = {
      name: '',
      notes: [],
      bgColor: this.noteColourRandom(), 
      userId: this.user._id['$oid']
    };
  }

  // Method to fetch all collections
  getAllCollections(){
    this.noteService.get_all_collection2().subscribe({
      next: (data) => {
        this.note_collection_list = data  
        this.getUsersNames()     
      },
      error: (error) => {
        console.log(error)
      }
    });
  }

  // Method to fetch users names
  getUsersNames() {
    for (let i = 0; i < this.note_collection_list.length; i++) {
      const note = this.note_collection_list[i];
      this.userService.get(note.userId).subscribe({
        next: (user) => {
          this.user_dictionary[note.userId.toString()] = user.name;
        },
        error: (error) => {
          console.log(error)
        }
      });
    }
    console.log(this.user_dictionary)
  }

  // Method to get the number of notes in a collection
  notes_collection(notes : ObjectID []) {
    return notes.length;
  }

  // Method to get user name by user id
  getUserNameById(userId) {
    console.log(userId)
    return this.user_dictionary[userId]
  }

  // Method to format date
  formatDate(date: Date) {
    let formattedDate = date.toString().substring(0,10);
    return formattedDate
  }

  // Method to change note collection color
  changeColour(color, note) {
    note.bgColor = color;
  }

  // Method to generate random note collection color
  noteColourRandom(): string {
    const values = Object.values(noteColors);
    const randomIndex = Math.floor(Math.random() * values.length);
    return values[randomIndex];
  }

  // Method to get contrast color for a given hex color
  getColourContrast(hexColor: string) {
    const r = parseInt(hexColor.substr(1, 2), 16);
    const g = parseInt(hexColor.substr(3, 2), 16);
    const b = parseInt(hexColor.substr(5, 2), 16);
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
    return luminance > 0.5 ? '#000000' : '#FFFFFF';
  }

  // Method to set hovered item
  setHoveredItem(item: string) {
    this.hovered_item = item;
  }

  // Method to save note collection
  saveCollection(){
    console.log(this.note_collection)
    this.noteService.create_collection(this.note_collection).subscribe({
      next: (data) => {
        console.log(data)
        this.note_collection_list.push(data)
      },
      error: (error) => {
        console.log(error)
      }
    });
  }

  // Method to edit a note collection
  edit_collection(note: Note_Collection) {
    console.log(`notes/collection/${note._id}`)
    this.router.navigate([`notes/collections/${note._id}`]);
  }

  // Method to delete a note collection
  deleteCollection(note_collection : Note_Collection){
    console.log(note_collection._id)
    this.noteService.delete_collection(note_collection._id).subscribe({
      next: (data) => {
        let index = this.note_collection_list.findIndex(item => item._id === note_collection._id);
        if (index !== -1) {
          this.note_collection_list.splice(index, 1);
        }
      },
      error: (error) => {
        console.log(error)
      }
    });
  }
}