import ObjectID from 'bson-objectid';

// Angular imports
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

// Other imports
import { Observable } from 'rxjs';
import { FriendRequest } from '../classes/friendRequest';

@Injectable({
  providedIn: 'root'
})

export class FriendRequestService {

  constructor( private http: HttpClient ) {}

  // HTTP options
  httpOptions = {
    headers: new HttpHeaders({
      "content-Type": "application/json",
      'Access-Control-Allow-Origin': '*'
    }),
  };

  // Method to fetch all friend requests for a specific friend
  getAll(friendId: ObjectID): Observable<FriendRequest[]> {
    return this.http.get<FriendRequest[]>("http://localhost:3000/friendsRequests_list/"+ friendId['$oid'], this.httpOptions);
  }

  // Method to accept a friend request
  accept(friendId: ObjectID,userId: ObjectID): Observable<any>{
    return this.http.get("http://localhost:3000/allow/" + friendId['$oid']+ "/" + userId['$oid'] , this.httpOptions);
  }

  // Method to deny a friend request
  deny(friendId: ObjectID,userId: ObjectID): Observable<any>{
    return this.http.get("http://localhost:3000/deny/" + friendId['$oid']+ "/" + userId['$oid'] , this.httpOptions);
  }
}