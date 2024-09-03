import { AsyncPipe, DatePipe, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { User } from '../models/user';
import { Observable } from 'rxjs';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-account',
  standalone: true,
  imports: [NgIf, AsyncPipe, DatePipe],
  templateUrl: './account.component.html',
  styleUrl: './account.component.scss',
})
export class AccountComponent {
  user$!: Observable<User>;
  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    this.user$ = this.userService.getMyAccount();
  }
}
