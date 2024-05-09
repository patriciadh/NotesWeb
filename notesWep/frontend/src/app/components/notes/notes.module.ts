// Angular imports
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Notes
import { NotesComponent } from './notes.component';
import { NotesRoutingModule } from './notes-routing.module';
import { NoteComponent } from './note/note.component';
import { NotesAdminComponent } from './adminNotes/adminNotes.component';
import { NoteListComponent } from './notesList/notesList.component';

import { ColorPickerModule } from 'ngx-color-picker';

// Share & Friendships
import { SharedModule } from 'src/app/sharedModule';
import { FriendListComponent } from './friendshipsList/friendshipsList.component';
import { FriendListCollectionsComponent } from './friendsListCollections/friendsListCollections.component';

// Collections
import { CollectionComponent } from './collection/collection.component';
import { CollectionAdminComponent } from './adminCollection/adminCollection.component';
import { ModifyCollectionComponent } from './editCollection/editCollection.component';

@NgModule({
  declarations: [
    // Notes
    NoteComponent,
    NotesComponent,
    NotesAdminComponent,
    NoteListComponent,
    
    // Collections
    CollectionComponent,
    CollectionAdminComponent,
    ModifyCollectionComponent,

    // Friends
    FriendListComponent,
    FriendListCollectionsComponent
  ],
  
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    NotesRoutingModule,
    ColorPickerModule,
    SharedModule
  ],

  providers: [],
  bootstrap: [NotesComponent]
})

export class NotesModule { }