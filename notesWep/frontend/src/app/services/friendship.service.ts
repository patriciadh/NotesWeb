import ObjectID from 'bson-objectid';

// Angular imports
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

// Other imports
import { Observable } from 'rxjs';
import { Friendship } from '../classes/friendship';

@Injectable({
  providedIn: 'root'
})

export class FriendshipService {

  constructor(private http: HttpClient) { }

  // HTTP Options
  httpOptions = {
    headers: new HttpHeaders({
      "content-Type": "application/json",
      'Access-Control-Allow-Origin': '*'
    }),
  };

  // Get all friendships
  getAll(userId: ObjectID):Observable<Friendship[]>{
    return this.http.get<Friendship[]>("http://localhost:3000/friendShips_list/"+ userId['$oid'], this.httpOptions);
  }
}