import { model, Schema } from "mongoose";
import userInfoSchema from "./user-info.mongo";

const userSchema = new Schema({
    user_email: {
        type: String, unique: true, require: true
    },
    user_name: {
        type: String, require: true
    },
    user_id: {
        type: String, unique: true, require: true
    },
    user_location: {
        type: String,
    },
    user_info: {userInfoSchema},

    password: {
        type: String, require: true
    },
    vehicle_info: [{
        vehicle_id: {
            type: String
        }
    }],
    state: {
        online: {
            type: Boolean, default: false
        },
        available: {
            type: Boolean, default: false
        }
    }
});

const User = model("User", userSchema);

export default User;