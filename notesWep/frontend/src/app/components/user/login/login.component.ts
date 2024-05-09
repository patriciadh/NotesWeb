// Angular imports
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

// Other imports
import { UserService } from 'src/app/services/user.service';
import { checkEmail, checkPassword } from '../signup/checkInfo';

// Message
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {

  form: FormGroup;
  submitted: boolean = false;

  constructor( private router: Router, private userService: UserService, private formBuilder: FormBuilder ) { }

  ngOnInit(): void {
    // Initialize the form with validation rules
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    }, {
      validators: [checkEmail("email"), checkPassword("password")]
    });
  }

  // Method to check user credentials
  check(): void {
    this.submitted = true;
    if (this.form.valid) {
      this.userService.get_by_email(this.form.value.email).subscribe({
        next: (user) => {
          // Save current user to the session
          this.userService.saveCurrentUser(user)
          // Navigate to the notes page after successful login
          this.router.navigate([`notes`]);
        },
        error: (error) => {
          console.log(error)
          // Show error message for invalid credentials
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Wrong email or password',
          });
        }
      })
    }else{
      // Show error message for invalid form
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'There are errors, please fix them and then submit the form.',
      });
    }
  }
}