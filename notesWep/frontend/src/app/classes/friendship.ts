import ObjectID from "bson-objectid";
// This class is used to model and handle friendships between users.
export class Friendship {
    _id :   String ;
    userId :ObjectID;
    friendId: ObjectID;
    updated_at?: Date;
    created_at?: Date;
}