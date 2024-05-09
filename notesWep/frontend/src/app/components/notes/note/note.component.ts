// Angular imports
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

// Other imports
import { BsModalService } from 'ngx-bootstrap/modal';
import { Note } from 'src/app/classes/note';
import { NoteService } from 'src/app/services/note.service';
import { ImageComponent } from '../../image/image.component';
import { noteColors } from 'src/app/interfaces/colours';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.scss']
})

export class NoteComponent  implements OnInit{

  // Properties
  note: Note
  colorList: string[] = Object.values(noteColors);

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private noteService: NoteService,
    private modalService: BsModalService
  ) { }

  ngOnInit(): void {
    // Get note by ID
    const ID = this.route.snapshot.paramMap.get('id');
    this.getNote(ID)
  }

  // Go back to notes page
  goBack(){
    this.router.navigate(['notes']);
  }

  // Get the note by its id
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

  // Changes the color of the current note
  changeColour(color) {
    this.note.bgColor = color;
  }

  // Determines the contrast color for a given hex color
  getColourContrast(hexColor: string) {
    const r = parseInt(hexColor.substr(1, 2), 16);
    const g = parseInt(hexColor.substr(3, 2), 16);
    const b = parseInt(hexColor.substr(5, 2), 16);
    
    const lum = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
    return lum > 0.5 ? '#000000' : '#FFFFFF';
  }

  // Opens the modal to display an image
  openModalImage(note: Note, editable: boolean) {
    this.modalService.show(ImageComponent, { initialState: { note, editable } })
  }

  // Edits the note
  editNote(){
    console.log(this.note)
    this.noteService.update(this.note._id, this.note).subscribe({
      next: (data) => {
        this.router.navigate(['notes']);
      },
      error: (error) => {
        console.log(error)
      }
    });
  }
}