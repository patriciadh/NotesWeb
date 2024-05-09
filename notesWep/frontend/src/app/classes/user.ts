import ObjectId from 'bson-objectid';
// This class is used to model users within the system.
export class User {
    _id?: ObjectId;
    userType: string;
    name: string;
    surname: string;
    email: string;
    password: string;
    isEnable: boolean; // Indicates whether the user account is enabled or disabled.
}