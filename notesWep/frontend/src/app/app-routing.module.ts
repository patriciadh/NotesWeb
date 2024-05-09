import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Admin
import { AdminGuard } from './components/adminMenu/adminGuard';
import { AdminMenuComponent } from './components/adminMenu/adminMenu.component';
import { NotesAdminComponent } from './components/notes/adminNotes/adminNotes.component';
import { CollectionAdminComponent } from './components/notes/adminCollection/adminCollection.component';
import { AdminFriendMenuComponent } from './components/adminFriendshipMenu/adminFriendshipMenu.component';
import { AdminSendRequestComponent } from './components/adminSendRequest/adminSendRequest.component';
import { AdminFriendshipComponent } from './components/adminFriendships/adminFriendships.component';
import { AdminFriendRequestComponent } from './components/adminFriendshipRequest/adminFriendshipRequest.component';

// Users
import { HomeComponent } from './components/home/home.component';
import { UsersComponent } from './components/users/users.component';
import { UsersGuard } from './components/users/usersGuard';
import { ListUsersComponent } from './components/usersList/usersList.component';
import { NotesGuard } from './components/notes/adminNotes/notesGuard';
import { FriendMenuComponent } from './components/friendshipsMenu/friendshipsMenu.component';
import { FriendRequestComponent } from './components/friendshipRequest/friendshipRequest.component';
import { SendRequestComponent } from './components/friendshipRequest/sendRequest/sendRequest.component';
import { FriendshipComponent } from './components/friendship/friendship.component';

// Routes
const routes: Routes = [
  {
    path: '', component: HomeComponent
  },
  // Admin
  { path: 'adminMenu', component: AdminMenuComponent, canActivate: [AdminGuard]},
  { path: 'adminNotes', component: NotesAdminComponent, canActivate: [NotesGuard]},
  { path: 'adminCollection', component: CollectionAdminComponent, canActivate: [NotesGuard]},
  { path: 'adminFriendshipsMenu', component: AdminFriendMenuComponent },
  { path: 'adminFriendshipRequest', component: AdminFriendRequestComponent },
  { path: 'adminSendRequest', component: AdminSendRequestComponent },
  { path: 'adminFriendships', component: AdminFriendshipComponent },

  // Users
  { path: 'users', component: UsersComponent, canActivate: [UsersGuard] },
  { path: 'usersList', component: ListUsersComponent, canActivate: [NotesGuard]},
  { path: 'friendshipsMenu', component: FriendMenuComponent },
  { path: 'friendships', component: FriendshipComponent },
  { path: 'friendsRequests', component: FriendRequestComponent},
  { path: 'sendRequests', component: SendRequestComponent },

  {
    path: 'user',
    loadChildren: () =>
      import('./components/user/user.module').then((m) => m.UserModule),
  },
  {
    path: 'notes',
    loadChildren: () =>
      import('./components/notes/notes.module').then((m) => m.NotesModule),
  },
];

@NgModule({
  imports: [
    // Configure RouterModule with defined routes
    RouterModule.forRoot(routes)
  ],
  declarations: [],
  // Export RouterModule for use in other modules
  exports: [RouterModule]
})

// Main AppRoutingModule class
export class AppRoutingModule { }