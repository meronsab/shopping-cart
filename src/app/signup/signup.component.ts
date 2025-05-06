import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './signup.component.html',
})
export class SignupComponent {
  signupForm: FormGroup;
  errorMessage: string = '';

  constructor(private fb: FormBuilder, private router: Router) {
    // Initialize the signup form with validators
    this.signupForm = this.fb.group(
      {
        email: ['', [Validators.required, Validators.email]],
        password: [
          '',
          [
            Validators.required,
            Validators.minLength(6),
            Validators.pattern('(?=.*[A-Z]).{6,}'),
          ],
        ],
        confirmPassword: ['', Validators.required],
      },
      { validators: this.passwordsMatch }
    );
  }

  // Custom validator to check if passwords match
  passwordsMatch(group: FormGroup) {
    const password = group.get('password')?.value;
    const confirm = group.get('confirmPassword')?.value;
    return password === confirm ? null : { notMatching: true };
  }

  // Handle form submission
  onSubmit() {
    if (this.signupForm.invalid) return;

    const { email, password } = this.signupForm.value;
    const users = JSON.parse(localStorage.getItem('users') || '[]');

    if (users.find((u: any) => u.email === email)) {
      this.errorMessage = 'User already exists';
      return;
    }

    users.push({ email, password });
    localStorage.setItem('users', JSON.stringify(users));
    alert('Signup successful!');
    this.signupForm.reset();

    // Redirect to login after successful signup
    this.router.navigate(['/login']);
  }

  // Navigate to login page
  goToLogin() {
    this.router.navigate(['/login']);
  }
}
