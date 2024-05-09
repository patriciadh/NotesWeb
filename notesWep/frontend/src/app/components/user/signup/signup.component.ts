// Angular imports
import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

// Other imports
import { UserService } from 'src/app/services/user.service';
import { checkName, checkEmail, checkPassword, samePasswords } from './checkInfo';

// Message
import Swal from 'sweetalert2';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})

export class SignupComponent {

  // Properties
  form: FormGroup;
  form_submitted: boolean = false;

  constructor(private formBuilder: FormBuilder, private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    // Initialize the form with validation rules
    this.form = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      surname: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirm_password: ['', [Validators.required, Validators.minLength(6)]]
    }, {
      // Custom checjers for form validation
      checkers: [
        samePasswords("password", "confirm_password"),
        checkPassword("password"),
        checkPassword("confirm_password"),
        checkName("name"),
        checkName("surname"),
        checkEmail("email")]
    });
  }

  // Method to handle form submission
  onSubmit(): void {
    // Mark the form as submitted
    this.form_submitted = true;
    // Check if the form is valid
    if (this.form.valid) {
      this.form
      // Extract form data and remove confirm_password field
      const formInfo = this.form.value
      delete formInfo.confirm_password
      // Call the user service to create a new user
      this.userService.create(formInfo).subscribe({
        next: (data) => {
          Swal.fire({
            icon: 'success',
            title: 'User successfully created',
            text: 'The user was successfully created.',
            showConfirmButton: false,
            timer: 2000
          }).then(() => {
            this.router.navigate(['/']);
          });
        },
        error: (error) => {
          if (error && error.error && 'email' in error.error) {
            this.form.controls['email'].setErrors({ taken: false });
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'The email is alrady used.',
            });
          }else{
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Impossible to create the user, please check all the information.',
            });
          }
        }
      });
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'User could not be created, please check that the username you are entering is unique, and that the password contains lowercase, uppercase, numbers and symbols (like *...).',
      });
    }
  }
}