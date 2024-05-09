import ObjectId from 'bson-objectid';
// This class is used to model and handle collections of notes associated with a user.
export class Note_Collection {
    _id?: ObjectId;
    name: string;
    userId: ObjectId;
    notes: ObjectId [];
    bgColor: string;
    updated_at?: Date;
    created_at?: Date;
}