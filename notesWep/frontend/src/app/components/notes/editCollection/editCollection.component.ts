// Angular imports
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

// Other imports
import { BsModalService } from 'ngx-bootstrap/modal';
import { User } from '../../../classes/user';
import { UserService } from '../../../services/user.service';
import { Note } from '../../../classes/note';
import { noteColors } from 'src/app/interfaces/colours';
import { NoteService } from 'src/app/services/note.service';
import { Note_Collection } from 'src/app/classes/noteCollection';
import { ImageComponent } from '../../image/image.component';

// Message
import Swal from 'sweetalert2';

@Component({
  selector: 'app-editCollection',
  templateUrl: './editCollection.component.html',
  styleUrls: ['./editCollection.component.scss']
})

export class ModifyCollectionComponent {

  // Properties
  note: Note;
  user: User;
  user_dictionary: { [id: string]: string } = {};
  note_list: Note[];
  note_collection: Note_Collection;
  bgColors = noteColors;
  color_list: string[] = Object.values(noteColors);
  hovered_item: string;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private userService: UserService,
    private noteService: NoteService,
    private modalService: BsModalService
  ) {}

  ngOnInit(): void{
    const ID = this.route.snapshot.paramMap.get('id')
    // Fetch the collection by ID
    this.getCollection(ID)
    // Get current user
    this.user = this.userService.getCurrentUser()
    this.note = {
      title: '',
      content: '',
      imageURL: '',
      bgColor: this.noteColourRandom(),
      isShared: false,
      user: this.user._id['$oid']
    };
  }

  // Method to set hovered item
  setHoveredItem(item: string) {
    this.hovered_item = item;
  }

  // Retrieves the username by ID
  getUserNameById(userId: string): string {
    console.log(userId)
    console.log(this.user_dictionary)
    return this.user_dictionary[userId]
  }

  // Formats the date
  formatDate(date: Date) {
    let formattedDate = date.toString().substring(0,10);
    return formattedDate
  }

  // Retrieves the collection based on its ID
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

  // Changes the color of the current note
  changeColour(color) {
    this.note.bgColor = color;
  }

  // Generates a random note color
  noteColourRandom(): string {
    const values = Object.values(noteColors);
    const randomIndex = Math.floor(Math.random() * values.length);
    return values[randomIndex];
  }

  // Changes the color of a specific note in the collection
  changeColourCollection(color, note) {
    note.bgColor = color;
  }

  // Determines the contrast color for a given hex color
  getColourContrast(hexColor: string) {
    const r = parseInt(hexColor.substr(1, 2), 16);
    const g = parseInt(hexColor.substr(3, 2), 16);
    const b = parseInt(hexColor.substr(5, 2), 16);
    const lum = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
    return lum > 0.5 ? '#000000' : '#FFFFFF';
  }

  // Saves a new note
  saveNote(){
    this.noteService.create(this.note).subscribe({
      next: (data) => {
        let note = data
        this.noteService.add_note_to_collection(this.note_collection._id, data._id['$oid']).subscribe({
          next: (data) => {
            this.note_list.push(note)
            Swal.fire({
              icon: 'success',
              title: 'Note created',
              text: 'The note was created successfully.',
              showConfirmButton: false,
              timer: 2000
            });
    
            setTimeout(function() {
              window.location.reload();
            }, 2000);
          },
          error: (error) => {
            console.log(error)
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'It was not possible to create the note.',
            });
          }
        });
      },
      error: (error) => {
        console.log(error)
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong.',
        });
      }
    });
  }

  // Deletes a note
  deleteNote(note : Note){
    this.noteService.delete(note._id).subscribe({
      next: (data) => {
        this.noteService.remove_note_from_collection(this.note_collection._id, note._id['$oid']).subscribe({
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
      },
      error: (error) => {
        console.log(error)
      }
    });
  }

  // Edits the current collection
  editCollection(){
    console.log(this.note_collection._id)
    this.noteService.update_collection(this.note_collection._id, this.note_collection).subscribe({
      next: (data) => {
        console.log(data)
      },
      error: (error) => {
        console.log(error)
      }
    });
  }

  // Edits a note
  editNote(note: Note) {
    this.router.navigate([`notes/edit/${note._id['$oid']}`]);
  }

  // Opens the modal to display an image
  openModalImage(note: Note, editable: boolean) {
    this.modalService.show(ImageComponent, { initialState: { note, editable } })
  }

  // Shares a note with a friend
  shareNote(note : Note, friend: User){
    friend = this.user
    console.log(note._id['$oid'])
    this.noteService.share(note.user, friend._id, note._id).subscribe({
      next: (data) => {
        console.log(data)
      },
      error: (error) => {
        console.log(error)
      }
    });
  }
}