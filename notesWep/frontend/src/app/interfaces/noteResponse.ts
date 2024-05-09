import { Note } from "../classes/note";
import { Note_Collection } from "../classes/noteCollection";

export interface NotesResponse {
    notes: Note[],
    notes_collection: Note_Collection
}