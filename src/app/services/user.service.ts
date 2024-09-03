import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly API_URL = 'https://localhost:7063/api';
  constructor(private http: HttpClient) {}
  signUp(
    email: string,
    dateOfBirth: Date,
    userName: string,
    firstName: string,
    lastName: string,
    password: string,
    profilePhoto: string | null
  ): Observable<any> {
    return this.http.post(`${this.API_URL}/accounts/register`, {
      userName,
      firstName,
      lastName,
      dateOfBirth,
      email,
      password,
      profilePhoto,
    });
  }

  getMyAccount(): Observable<User> {
    return this.http.get<any>(`${this.API_URL}/accounts`).pipe(
      map((char: any) => ({
        firstName: char.firstName,
        lastName: char.lastName,
        userName: char.userName,
        email: char.email,
        dateOfBirth: char.dateOfBirth,
        profilePhoto: char.profilePhoto,
      }))
    );
  }

  getAccountById(id: string): Observable<User> {
    return this.http.get<any>(`${this.API_URL}/accounts/${id}`).pipe(
      map((char: any) => ({
        email: null,
        firstName: char.firstName,
        lastName: char.lastName,
        userName: char.userName,
        dateOfBirth: char.dateOfBirth,
        profilePhoto: char.profilePhoto,
      }))
    );
  }

  editMyAccount(
    email: string,
    userName: string,
    firstName: string,
    lastName: string,
    dateOfBirth: Date,
    profilePhoto: string | null
  ): Observable<any> {
    return this.http.put(`${this.API_URL}/accounts`, {
      email,
      userName,
      firstName,
      lastName,
      dateOfBirth,
      profilePhoto,
    });
  }

  editMyPassword(
    currentPassword: string,
    newPassword: string
  ): Observable<any> {
    return this.http.put(`${this.API_URL}/accounts/password`, {
      currentPassword,
      newPassword,
    });
  }
}
