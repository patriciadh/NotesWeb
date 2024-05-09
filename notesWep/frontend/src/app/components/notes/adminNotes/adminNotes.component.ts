import ObjectId from 'bson-objectid';

// Angular imports
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

// Other imports
import { BsModalService } from 'ngx-bootstrap/modal';
import { User } from '../../../classes/user';
import { UserService } from '../../../services/user.service';
import { Note } from '../../../classes/note';
import { NoteService } from '../../../services/note.service';
import { noteColors } from 'src/app/interfaces/colours';
import { ImageComponent } from '../../image/image.component';

@Component({
  selector: 'app-adminNotes',
  templateUrl: './adminNotes.component.html',
  styleUrls: ['./adminNotes.component.scss']
})

export class NotesAdminComponent implements OnInit {

  // Properties
  note: Note;
  user_dictionary: { [id: string]: string } = {};
  note_list: Note[];
  hovered_item: string;
  color_list: string[] = Object.values(noteColors);
  bgColors = noteColors;

  constructor(
    private router: Router,
    private modalService: BsModalService,
    private userService: UserService,
    private noteService: NoteService
  ) {}

  // Admin user
  user = {
    id: new ObjectId('66255cbf7d9a7331986307ee'),
    userType: "ADMIN",
    name: "admin",
    surname: "admin",
    email: "admin@gmail.com",
    password: "Admin1*",
    isEnable: true
  } as User

  ngOnInit(): void{

    // Get current user and notes
    this.getAllNotes()
    this.user = this.userService.getCurrentUser()

    this.note = {
      title: '',
      content: '',
      bgColor: this.noteColourRandom(),
      imageURL: '',
      isShared: false,
      user: this.user._id['$oid']
    };
  }

  // Method to set hovered item
  setHoveredItem(item: string) {
    this.hovered_item = item;
  }

  // Method to get all the user notes
  getAllNotes(){
    this.noteService.getAll2().subscribe({
      next: (data) => {
        this.note_list = data
        this.getUsersNames()
      },
      error: (error) => {
        console.log(error)
      }
    });
  }

  // Method to fetch user names
  getUsersNames() {
    for (let i = 0; i < this.note_list.length; i++) {
      const note = this.note_list[i];
      this.userService.get(note.user['$oid']).subscribe({
        next: (user) => {
          this.user_dictionary[note.user['$oid']] = user.name;
        },
        error: (error) => {
          console.log(error)
        }
      });
    }
  }

  // Method to get user name by user id
  getUserNameById(userId: string): string {
    console.log(userId)
    console.log(this.user_dictionary)
    return this.user_dictionary[userId]
  }

  // Method to format date
  formatDate(date: Date) {
    let formattedDate = date.toString().substring(0,10);
    return formattedDate
  }

  // Opens the modal to display an image
  openModalImage(note: Note, editable: boolean) {
    this.modalService.show(ImageComponent, { initialState: { note, editable } })
  }

  // Method to generate random note colour
  noteColourRandom(): string {
    const values = Object.values(noteColors);
    const randomIndex = Math.floor(Math.random() * values.length);
    return values[randomIndex];
  }

  // Method to change note colour
  changeColour(color) {
    this.note.bgColor = color;
  }

  // Method to get contrast color for a given hex colour
  getColourContrast(hexColor: string) {
    const r = parseInt(hexColor.substr(1, 2), 16);
    const g = parseInt(hexColor.substr(3, 2), 16);
    const b = parseInt(hexColor.substr(5, 2), 16);

    const lum = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
    return lum > 0.5 ? '#000000' : '#FFFFFF';
  }

  // Method to save note
  saveNote(){
    this.noteService.create(this.note).subscribe({
      next: (data) => {
        console.log(data)
        this.note_list.push(data)
      },
      error: (error) => {
        console.log(error)
      }
    });
  }

  // Method to delete note
  deleteNote(note : Note){
    console.log(note._id['$oid'])
    this.noteService.delete(note._id).subscribe({
      next: (data) => {
        let index = this.note_list.findIndex(item => item._id === note._id);
        if (index !== -1) {
          this.note_list.splice(index, 1);
        }
      },
      error: (error) => {
        console.log(error)
      }
    });
  }

  // Method to edit note
  editNote(note: Note) {
    this.router.navigate([`notes/edit/${note._id['$oid']}`]);
  }
}