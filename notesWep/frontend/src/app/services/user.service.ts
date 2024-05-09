import ObjectID from 'bson-objectid';

// Angular imports
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

// Other imports
import { User } from '../classes/user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class UserService {

  // Key to store current user in localStorage
  private readonly USER_KEY = 'currentUser';
  private readonly USER_KEY2 = 'currentUser2';

  constructor(private http: HttpClient) { }

  // HTTP Options
  httpOptions = {
    headers: new HttpHeaders({
      "content-Type": "application/json",
      'Access-Control-Allow-Origin': '*'
    }),
  };

  // Method to perform user login
  login(value: any) {
    throw new Error('Method not implemented.');
  }

  // Method to get a user by ID
  get(id): Observable<User> {
    return this.http.get<User>("http://localhost:3000/users/" + id, this.httpOptions);
  }

  // Method to get a user by email
  get_by_email(email): Observable<User> {
    return this.http.get<User>("http://localhost:3000/users?email=" + email, this.httpOptions);
  }

  // Method to get all users
  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>("http://localhost:3000/users", this.httpOptions);
  }

  // Method to create a new user
  create(data): Observable<User> {
    return this.http.post<User>("http://localhost:3000/users", JSON.stringify(data), this.httpOptions);
  }

  // Method to delete a user
  delete(id) {
    return this.http.delete<User>("http://localhost:3000/users/" + id['$oid'], this.httpOptions);
  }

  // Method to update a user
  update(data, id): Observable<User> {
    return this.http.put<User>("http://localhost:3000/users/" + id['$oid'], JSON.stringify(data), this.httpOptions);
  }

  // Method to make a user Admin type
  makeAdmin(id: ObjectID) {
    return this.http.get<User>("http://localhost:3000/users/promote/" + id['$oid'], this.httpOptions);
  }

  // Method to make a user User type
  makeUser(id: ObjectID) {
    return this.http.get<User>("http://localhost:3000/users/demote/" + id['$oid'], this.httpOptions);
  }

  // Method to get the current user from localStorage
  public getCurrentUser(): User | null {
    const userJson = localStorage.getItem(this.USER_KEY);
    return userJson ? JSON.parse(userJson) : null;
  }

  // Method to get the current user from localStorage
  public getCurrentUser2(): User | null {
    const userJson = localStorage.getItem(this.USER_KEY2);
    return userJson ? JSON.parse(userJson) : null;
  }

  // Method to save the current user to localStorage
  public saveCurrentUser(user: User): void {
    localStorage.setItem(this.USER_KEY, JSON.stringify(user));
  }

  // Method to save the current user to localStorage
  public saveCurrentUser2(user: User): void {
    localStorage.setItem(this.USER_KEY2, JSON.stringify(user));
  }

  // Method to remove the current user from localStorage
  public removeCurrentUser(): void {
    localStorage.removeItem(this.USER_KEY);
  }

  // Method to remove the current user from localStorage
  public removeCurrentUser2(): void {
    localStorage.removeItem(this.USER_KEY2);
  }
}