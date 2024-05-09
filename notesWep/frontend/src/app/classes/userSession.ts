import ObjectId from 'bson-objectid';
// This class is used to model user sessions for authentication purposes.
export class Session {
    _id?: ObjectId;
    expire: Date;
    token: string;
    userType: string;
    userEmail: string;
    password: string;
}