import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { NgFor, NgIf } from '@angular/common';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-update-password',
  standalone: true,
  imports: [FormsModule, MatSnackBarModule, NgIf, NgFor],
  templateUrl: './update-password.component.html',
  styleUrl: './update-password.component.scss',
})
export class UpdatePasswordComponent {
  serverErrors: string[] | null = null;

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  onSubmit(form: NgForm) {
    this.serverErrors = null;
    if (form.invalid) {
      this.showSnackBar('All fields are required');
      return;
    }
    if (form.value.newPassword !== form.value.confirmPassword) {
      this.showSnackBar('Passwords do not match');
      return;
    }
    this.userService
      .editMyPassword(form.value.oldPassword, form.value.newPassword)
      .subscribe({
        next: (resp) => {
          const newToken = resp?.token;
          if (newToken) {
            this.authService.logout();
            localStorage.setItem('auth_token', newToken);
          }
          this.router.navigate(['/account']);
          this.showSnackBar('Password updated successfully.');
        },
        error: (err) => {
          console.error('Login failed', err);
          this.serverErrors = err.error.errors;
        },
      });
  }

  private showSnackBar(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
    });
  }
}
