import { FormGroup } from "@angular/forms";

// Method to check the name
export function checkName(controlName: string) {
  return (formGroup: FormGroup) => {
    const nameControl = formGroup.controls[controlName];
    const namePattern = /^[a-zA-Z]+$/;
    if (nameControl.errors && !nameControl.errors['valid']) {
      return;
    }
    if (!namePattern.test(nameControl.value)) {
      nameControl.setErrors({ name: true });
    } else {
      nameControl.setErrors(null);
    }
  };
}

// Method to check the email
export function checkEmail(controlName: string) {
  return (formGroup: FormGroup) => {
    const emailControl = formGroup.controls[controlName];
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (emailControl.errors && !emailControl.errors['valid']) {
      return;
    }
    if (!emailPattern.test(emailControl.value)) {
      emailControl.setErrors({ email: true });
    } else {
      emailControl.setErrors(null);
    }
  };
}

// Method to check the password
export function checkPassword(controlName: string) {
  return (formGroup: FormGroup) => {
    const passwordControl = formGroup.controls[controlName];
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/;
    if (passwordControl.errors && !passwordControl.errors['valid']) {
      return;
    }
    if (!passwordPattern.test(passwordControl.value)) {
      passwordControl.setErrors({ password: true });
    } else {
      passwordControl.setErrors(null);
    }
  };
}

// Method to control that the passwords are the same
export function samePasswords(controlName: string, matchingControlName: string) {
  return (formGroup: FormGroup) => {
    let control = formGroup.controls[controlName];
    let matchingControl = formGroup.controls[matchingControlName]
    if ( matchingControl.errors && !matchingControl.errors['match'] ) {
      return;
    }
    if (control.value !== matchingControl.value) {
      matchingControl.setErrors({ match: true });
    } else {
      matchingControl.setErrors(null);
    }
  };
}