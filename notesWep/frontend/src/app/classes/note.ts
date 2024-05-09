import ObjectId from 'bson-objectid';
// This class is used to model and handle individual notes created by users.
export class Note {
    _id?: ObjectId;
    title: string;
    content: string;
    user: ObjectId;
    bgColor: string;
    isShared: boolean;
    imageURL?: string;
    updated_at?: Date;
    created_at?: Date;
}