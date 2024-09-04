import { AsyncPipe, DatePipe, NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { UserService } from '../services/user.service';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-update-account',
  standalone: true,
  imports: [
    FormsModule,
    MatSnackBarModule,
    AsyncPipe,
    NgIf,
    NgFor,
    FontAwesomeModule,
  ],
  providers: [DatePipe],
  templateUrl: './update-account.component.html',
  styleUrl: './update-account.component.scss',
})
export class UpdateAccountComponent {
  user$!: Observable<User>;
  url!: string | null;
  dob!: string | null;
  faTrashCan = faTrashCan;
  serverErrors: string[] | null = null;

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar,
    private datePipe: DatePipe
  ) {}

  private showSnackBar(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
    });
  }

  onSelectFile(event: any) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      console.log(event.target.files[0]);
      reader.onload = (event: any) => {
        this.url = event.target.result;
      };
    }
  }

  onSubmit(form: NgForm) {
    this.serverErrors = null;
    if (form.invalid) {
      this.showSnackBar('The username and the name are required');
      return;
    }
    if (form.value.password !== form.value.confirmPassword) {
      this.showSnackBar('Passwords do not match');
      return;
    }
    const password = form.value.password ? form.value.password : null;
    this.userService
      .editMyAccount(
        form.value.email,
        form.value.username,
        form.value.fName,
        form.value.lName,
        form.value.dob,
        this.url
      )
      .subscribe({
        next: (resp) => {
          const newToken = resp?.token;
          if (newToken) {
            this.authService.logout();
            localStorage.setItem('auth_token', newToken);
          }
          this.showSnackBar('Account updated successfully.');
          this.router.navigate(['/account']);
          this.authService.authStateSubject.next(true);
        },
        error: (err) => {
          this.serverErrors = err.error.errors;
        },
      });
  }

  ngOnInit(): void {
    this.user$ = this.userService.getMyAccount();
    this.user$.subscribe({
      next: (user) => {
        if (user.profilePhoto) {
          this.url = user.profilePhoto;
        }
        this.dob =
          this.datePipe.transform(user.dateOfBirth, 'yyyy-MM-dd') || '';
      },
      error: (err) => {
        console.error('Failed to load user photo', err);
      },
    });
  }

  OnDeleteAccount() {
    this.authService.deleteMyAccount().subscribe({
      next: (response) => {
        console.log('Account successfully deleted:', response);
        this.authService.logout();
        this.router.navigate(['/']);
        this.showSnackBar('Account deleted successfully.');
      },
      error: (error) => {
        console.error('Error deleting account:', error);
        this.showSnackBar('Failed to delete account: ' + error);
      },
    });
  }

  cancelPhoto() {
    this.user$.subscribe({
      next: (user) => {
        if (user.profilePhoto != this.url) {
          this.url = user.profilePhoto;
        } else {
          this.url = null;
        }
      },
      error: (err) => {
        console.error('Failed to load user photo', err);
      },
    });
  }
}
