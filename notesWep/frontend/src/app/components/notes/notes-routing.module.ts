// Angular imports
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Notes
import { NoteComponent } from './note/note.component';
import { NotesComponent } from './notes.component';
import { NoteListComponent } from './notesList/notesList.component';

// Collections
import { CollectionComponent } from './collection/collection.component';
import { ModifyCollectionComponent } from './editCollection/editCollection.component';

// Friendships
import { FriendListComponent } from './friendshipsList/friendshipsList.component';
import { FriendListCollectionsComponent } from './friendsListCollections/friendsListCollections.component';

// Routes
const routes: Routes = [
  {
    path: '', component: NotesComponent,
    children: [
      {
        path: '',
        component: NoteListComponent,
      },
      {
        path: 'collections',
        component: CollectionComponent,
      },
      {
        path: 'collections/:id',
        component: ModifyCollectionComponent,
      },
      {
        path: 'new/:id',
        component: NoteListComponent,
      },
      {
        path: 'edit/:id',
        component: NoteComponent,
      },
      {
        path: 'friendsList/:id',
        component: FriendListComponent,
      },
      {
        path: 'friendsListCollections/:id',
        component: FriendListCollectionsComponent,
      },
    ]
  },
  { path: '**', redirectTo: '', }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  declarations: [],
  exports: [RouterModule]
})

export class NotesRoutingModule { }