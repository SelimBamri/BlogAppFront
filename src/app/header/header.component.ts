import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';
import { User } from '../models/user';
import { Subscription } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AsyncPipe, NgIf } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, AsyncPipe, NgIf],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  user: User | null = null;
  isLoggedIn = false;

  private subscriptions: Subscription = new Subscription();

  constructor(
    private router: Router,
    private authService: AuthService,
    private userService: UserService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.subscriptions.add(
      this.authService.authState$.subscribe((isLoggedIn) => {
        this.isLoggedIn = isLoggedIn;
        if (isLoggedIn) {
          this.subscriptions.add(
            this.userService.getMyAccount().subscribe((user) => {
              this.user = user;
            })
          );
        } else {
          this.user = null;
        }
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/']);
    this.showSnackBar('Successfully logged out.');
  }

  redirectToMyAccount() {
    this.router.navigate(['/account']);
  }

  redirectToLogin() {
    this.router.navigate(['/login']);
  }

  redirectToRegister() {
    this.router.navigate(['/register']);
  }

  redirectToEditMyAccount() {
    this.router.navigate(['/update']);
  }

  redirectToEditMyPassword() {
    this.router.navigate(['/update-password']);
  }

  private showSnackBar(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
    });
  }
}
