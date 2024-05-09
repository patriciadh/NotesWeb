// Angular imports
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

// Other imports
import { User } from 'src/app/classes/user';
import { UserService } from 'src/app/services/user.service';
import { samePasswords, checkName, checkEmail, checkPassword } from '../signup/checkInfo';

// Message
import Swal from 'sweetalert2';

@Component({

  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']

})

export class ProfileComponent implements OnInit {

  // Properties
  user: User;
  info_form: FormGroup;
  info_submitted: boolean = false;
  password_form: FormGroup;
  password_submitted: boolean = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private userService: UserService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    // Fetch user details based on the route parameters
    console.log('Id:', this.route.snapshot.paramMap.get('id'));
    if (this.route.snapshot.paramMap && this.route.snapshot.paramMap.has('id')) {
      const id = this.route.snapshot.paramMap.get('id');
      this.userService.get(id).subscribe({
        next: (user) => {
          this.user = user
          this.setFormInfo()
        },
        error: () => {
          this.user = this.userService.getCurrentUser()
          this.setFormInfo()
        }
      })
    } else {
      this.user = this.userService.getCurrentUser()
      this.setFormInfo()
    }
  }

  // Initialize form values and validation rules
  setFormInfo() {
    // User info
    this.info_form = this.formBuilder.group({
      name: [this.user?.name || '', [Validators.required, Validators.minLength(2)]],
      surname: [this.user?.surname || '', [Validators.required, Validators.minLength(2)]],
      email: [this.user?.email || '', [Validators.required, Validators.email]],
    }, {
      validators: [
        checkName("name"),
        checkName("surname"),
        checkEmail("email")]
    });

    // User password
    this.password_form = this.formBuilder.group({
      password: ['', [Validators.required, Validators.minLength(6)]],
      passwordConfirm: ['', [Validators.required, Validators.minLength(6)]]
    }, {
      validators: [
        samePasswords("password", "passwordConfirm"),
        checkPassword("password"),
        checkPassword("passwordConfirm")],
    });

    this.info_form.get('name').setValue(this.user.name);
    this.info_form.get('surname').setValue(this.user.surname);
    this.info_form.get('email').setValue(this.user.email);
  }

  // Update user info
  updateUser() {
    const formData = this.info_form.value
    this.info_submitted = true;
    if (this.info_form.valid) {
      this.userService.update(formData, this.user._id).subscribe({
        next: (user: User) => {
          // Save updated user information
          if (!this.route.snapshot.paramMap || !this.route.snapshot.paramMap.has('id')){
            this.userService.saveCurrentUser(user)
          }
          Swal.fire({
            icon: 'success',
            title: 'User successfully updated',
            text: 'The user was updated successfully.',
            showConfirmButton: false,
            timer: 2000
          });
          setTimeout(function() {
            window.location.reload();
          }, 2000);
        },
        error: (error) => {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Impossible to update the user.',
          });
        }
      });
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'There are some errors, please fix them and then submit the form.',
      });
    }
  }

  // Delete user account
  deleteUser(){
    this.userService.delete(this.user._id).subscribe({
      next: (data) => {
        // Remove current user from session storage
        if (!this.route.snapshot.paramMap || !this.route.snapshot.paramMap.has('id')){
          this.userService.removeCurrentUser()
        }
        Swal.fire({
          icon: 'success',
          title: 'User successfully deleted',
          text: 'The user was deleted successfully.',
          showConfirmButton: false,
          timer: 2000
        }).then(() => {
          if (!this.route.snapshot.paramMap || !this.route.snapshot.paramMap.has('id')){
            this.router.navigate(['/']);
          }else{
            this.router.navigate(['/users']);
          }
        });
      },
      error: (error) => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Impossible to delete the user.',
        });
      }
    });
  }

  // Reset user password
  resetPassword() {
    const formData = this.password_form.value
    delete formData.passwordConfirm
    this.password_submitted = true;
    if (this.password_form.valid) {
      this.userService.update(formData, this.user._id).subscribe({
        next: (user: User) => {
          // Save updated user information
          if (!this.route.snapshot.paramMap || !this.route.snapshot.paramMap.has('id')){
            this.userService.saveCurrentUser(user)
          }
          Swal.fire({
            icon: 'success',
            title: 'Password successfully changed',
            text: 'The password was changed successfully.',
            showConfirmButton: false,
            timer: 2000
          });
          setTimeout(function() {
            window.location.reload();
          }, 2000);
        },
        error: (error) => {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'It was not possible to change your password.',
          });
        }
      });
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'There are some errors, please fix them and then submit the form.',
      });
    }
  }
}