import ObjectID from "bson-objectid";
// This class is used to model and handle friend requests between users.
export class FriendRequest {
    _id :   String ;
    userId :ObjectID;
    friendId: ObjectID;
    updated_at?: Date;
    created_at?: Date;
}