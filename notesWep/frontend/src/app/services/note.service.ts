import ObjectID from 'bson-objectid';

// Angular imports
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";

// Other imports
import { Observable } from "rxjs";
import { Note } from '../classes/note';
import { NotesResponse } from '../interfaces/noteResponse';
import { Note_Collection } from '../classes/noteCollection';

@Injectable({
  providedIn: 'root'
})

export class NoteService {

  constructor(private http: HttpClient) { }

  // HTTP Options
  httpOptions = {
    headers: new HttpHeaders({
      "content-Type": "application/json",
      'Access-Control-Allow-Origin': '*'
    }),
  };

  // Method to get all notes
  getAll(userId?): Observable<Note[]> {
    let url = 'http://localhost:3000/notes';
    if (userId) {
      url += `?user=${userId['$oid']}`;
    }
    return this.http.get<Note[]>(url, this.httpOptions);
  }

  // Method to get all notes
  getAll2(): Observable<Note[]> {
    let url = 'http://localhost:3000/notes';
    return this.http.get<Note[]>(url, this.httpOptions);
  }

  // Method to get a specific note
  get(id: string): Observable<Note> {
    return this.http.get<Note>("http://localhost:3000/notes/" + id, this.httpOptions);
  }

  // Method to create a note
  create(note: Note): Observable<Note> {
    return this.http.post<Note>("http://localhost:3000/notes", JSON.stringify(note), this.httpOptions);
  }

  // Method to delete a note
  delete(id: ObjectID) {
    return this.http.delete<Note>("http://localhost:3000/notes/" + id['$oid'], this.httpOptions);
  }

  // Method to update a note
  update(id: ObjectID, note: Note): Observable<Note> {
    return this.http.put<Note>("http://localhost:3000/notes/" + id['$oid'], JSON.stringify(note), this.httpOptions);
  }

  // Method to share a note with a friend
  share(authorId: ObjectID, friendId: ObjectID, noteId: ObjectID) {
    let share = { "authorId": authorId['$oid'], "friendId": friendId['$oid'], "noteId": noteId['$oid'] }
    let share_json = JSON.stringify(share)
    return this.http.post<Note>("http://localhost:3000/shares/share", share_json, this.httpOptions);
  }

  // Method to get a note collection
  get_collection(id: string): Observable<NotesResponse> {
    return this.http.get<NotesResponse>("http://localhost:3000/notes_collections/" + id, this.httpOptions);
  }

  // Method to get all note collections
  get_all_collection(userId?): Observable<Note_Collection[]> {
    let url = 'http://localhost:3000/notes_collections';
    if (userId) {
      url += `?userId=${userId['$oid']}`;
    }
    return this.http.get<Note_Collection[]>(url, this.httpOptions);
  }

  // Method to get all note collections
  get_all_collection2(): Observable<Note_Collection[]> {
    let url = 'http://localhost:3000/notes_collections';
    return this.http.get<Note_Collection[]>(url, this.httpOptions);
  }

  // Method to create a note collection
  create_collection(note_collection: Note_Collection): Observable<Note_Collection> {
    return this.http.post<Note_Collection>("http://localhost:3000/notes_collections", JSON.stringify(note_collection), this.httpOptions);
  }

  // Method to delete a note collection
  delete_collection(id: ObjectID) {
    return this.http.delete<Note_Collection>("http://localhost:3000/notes_collections/" + id, this.httpOptions);
  }

  // Method to update a note collection
  update_collection(id: ObjectID, note_collection: Note_Collection): Observable<Note_Collection> {
    return this.http.put<Note_Collection>("http://localhost:3000/notes_collections/" + id, JSON.stringify(note_collection), this.httpOptions);
  }

  // Method to share a note collection with a friend
  shareCollection(authorId: ObjectID, friendId: ObjectID, collectionId: String) {
    let shareCollection = { "authorId": authorId['$oid'], "friendId": friendId['$oid'], "collectionId": collectionId }
    let shareCollection_json = JSON.stringify(shareCollection)
    return this.http.post<Note_Collection>("http://localhost:3000/share_collection/shareCollection", shareCollection_json, this.httpOptions);
  }

  // Method to add a note to a collection
  add_note_to_collection(ncId: ObjectID, nId: ObjectID): Observable<Note_Collection> {
    return this.http.post<Note_Collection>("http://localhost:3000/notes_collections/" + ncId + "/notes/" + nId, this.httpOptions);
  }

  // Method to remove a note from a collection
  remove_note_from_collection(ncId: ObjectID, nId: ObjectID): Observable<Note_Collection> {
    return this.http.delete<Note_Collection>("http://localhost:3000/notes_collections/" + ncId + "/notes/" + nId, this.httpOptions);
  }
}
