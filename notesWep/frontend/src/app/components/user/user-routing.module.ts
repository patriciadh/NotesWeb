// Angular imports
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Other imports
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { ProfileComponent } from './profile/profile.component';
import { NoteListComponent } from '../notes/notesList/notesList.component';

// User routes
const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '', 
        redirectTo: 'signup', 
        pathMatch: 'full'
      },
      {
        path: 'signup', 
        component: SignupComponent,
      },
      {
        path: 'login',
        component: LoginComponent,
      },
      {
        path: 'profile', 
        component: ProfileComponent,
      },
      {
        path: 'profile/:id', 
        component: ProfileComponent,
      },
      {
        path: 'edit/:id',
        component : NoteListComponent
      }
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

export class UserRoutingModule { }