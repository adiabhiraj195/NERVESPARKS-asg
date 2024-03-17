import { model, Schema } from "mongoose";

const userInfoSchema = new Schema({
   user_info:{
        type: String,
   }
});

// const User = model("User", userInfoSchema);
export default  userInfoSchema;