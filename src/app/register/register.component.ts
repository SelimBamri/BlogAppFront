import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, MatSnackBarModule, FontAwesomeModule, NgIf, NgFor],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  faTrashCan = faTrashCan;
  url!: string | null;
  serverErrors: string[] | null = null;
  constructor(
    private userService: UserService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  onSelectFile(event: any) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (event: any) => {
        this.url = event.target.result;
      };
    }
  }

  cancelPhoto() {
    this.url = null;
  }

  private showSnackBar(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
    });
  }

  onSubmit(form: NgForm) {
    this.serverErrors = null;
    if (form.invalid) {
      this.showSnackBar('All fields are required');
      return;
    }
    if (form.value.password !== form.value.cPassword) {
      this.showSnackBar('Passwords do not match');
      return;
    }
    this.userService
      .signUp(
        form.value.email,
        form.value.dob,
        form.value.username,
        form.value.fName,
        form.value.lName,
        form.value.password,
        this.url
      )
      .subscribe({
        next: () => {
          console.log('Register successful');
          this.router.navigate(['/']);
          this.showSnackBar('Account created successfully.');
        },
        error: (err) => {
          console.error('Register failed', err.error.errors);
          this.serverErrors = err.error.errors;
        },
      });
  }
}
