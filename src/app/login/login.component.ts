import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, MatSnackBarModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  constructor(
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}
  onSubmit(form: NgForm) {
    this.authService.login(form.value.email, form.value.password).subscribe({
      next: () => {
        this.router.navigate(['/']);
        this.showSnackBar('Logged in.');
      },
      error: (err) => {
        console.error('Login failed', err);
        this.showSnackBar('Bad credentials, try again.');
      },
    });
  }
  private showSnackBar(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
    });
  }
}
