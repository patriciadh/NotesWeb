import ObjectID from 'bson-objectid';

// Angular imports
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

// Other imports
import { Observable } from 'rxjs';
import { User } from '../classes/user';

@Injectable({
  providedIn: 'root'
})

export class SendRequestService {

  constructor(private http: HttpClient) { }

  // HTTP Options
  httpOptions = {
    headers: new HttpHeaders({
      "content-Type": "application/json",
      'Access-Control-Allow-Origin': '*'
    }),
  };

  // Friends list
  getAllFriends(userId: ObjectID){
    return this.http.get<User[]>("http://localhost:3000/sendRequestsList/"+ userId['$oid'], this.httpOptions);
  }

  // Send a request
  sendRequest(userId: ObjectID,friendId: ObjectID,): Observable<any>{
    return this.http.get("http://localhost:3000/sendRequests/"+ userId['$oid']+"/"+friendId['$oid'], this.httpOptions);
  }
}