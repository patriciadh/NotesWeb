import { Component } from '@angular/core';

import { Note } from 'src/app/classes/note';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.css']
})

export class ImageComponent {

  // Properties
  note: Note
  editable: boolean
  filename: string = null;
  base64File: string = null;

  constructor(public bsModalRef: BsModalRef) { }

  // Lifecycle hook
  ngOnInit() {
    console.log(this.note)
  }

  // Method to format date
  formatDate(date: Date) {
    this.bsModalRef
    let formattedDate = date.toString().substring(0, 10);
    return formattedDate
  }

  // Method to handle file selection
  onFileSelect(e: any) {
    try {
      const file = e.target.files[0];
      if(!file){
        return
      }
      if (!file.type.startsWith('image/')) {
        this.filename = null;
        this.base64File = null;
        alert('Please, select an image file.');
        return;
      }
      const fReader = new FileReader()
      fReader.readAsDataURL(file)
      fReader.onloadend = (_event: any) => {
        this.base64File = _event.target.result;
        this.filename = file.name;
        console.log(this.base64File);
        this.note.imageURL = this.base64File;
        e.target.value = '';
      }
    } catch (error) {
      this.filename = null;
      this.base64File = null;
    }
  }
}