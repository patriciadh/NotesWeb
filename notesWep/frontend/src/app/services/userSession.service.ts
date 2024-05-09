// Angular imports
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";

// Other imports
import { Observable } from "rxjs";
import { Session } from '../classes/userSession';

@Injectable({
  providedIn: 'root'
})

export class SessionService {

    constructor(private http: HttpClient) { }

    // HTTP Options
    httpOptions = {
      headers: new HttpHeaders({
        "content-Type": "application/json",
        'Access-Control-Allow-Origin': '*'
      }),
    };

    // Key to store current session in localStorage
    private readonly SESSION_KEY = 'currentSession';

    // Method to get a session by ID
    get(id): Observable<Session> {
      return this.http.get<Session>("http://localhost:3000/sessions/" + id, this.httpOptions);
    }

    // Method to create a new session
    create(data): Observable<Session> {
      return this.http.post<Session>("http://localhost:3000/sessions", JSON.stringify(data), this.httpOptions);
    }

    // Method to delete a session
    delete(id) {  
      return this.http.delete<Session>("http://localhost:3000/sessions/" + id['$oid'], this.httpOptions);
    }

    // Method to get current session from localStorage
    public getCurrentSession(): Session | null {
      const sessionJson = localStorage.getItem(this.SESSION_KEY);
      return sessionJson ? JSON.parse(sessionJson) : null;
    }

    // Method to save current session in localStorage
    public saveCurrentSession(session: Session): void {
      localStorage.setItem(this.SESSION_KEY, JSON.stringify(session));
    }

    // Method to remove current session from localStorage
    public removeCurrentSession(): void {
      localStorage.removeItem(this.SESSION_KEY);
    }
}