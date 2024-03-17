// import sqlDb from "../db/sql";
import jwt from "jsonwebtoken";
import { genSalt, hash, compare } from "bcrypt";
import db from "../db";

class UserServices {
    createUser = async (name: string, email: string, password: string) => {
        const salt = await genSalt();
        const hashPassword = await hash(password, salt);

        const generatedID = this.generateUserId();

        await db.User.create({
            user_name: name,
            user_email: email,
            user_id: generatedID,
            password: hashPassword,
        });
    }

    generateUserId = (): String => {
        return "id" + Math.random().toString(16).slice(2);
    }

    findUserByEmail = async (email: string) => {
        return await db.User.findOne({ user_email: email });
    }

    checkPassword = async (inputPassword: string, password: string) => {
        return await compare(inputPassword, password);
    };

    loginResponse = async (user: any) => {
        // console.log(process.env.ACCESS_TOKEN_SECRET);
        await db.User.updateOne(
            { user_email: user.user_email },
            {
                state: {
                    online: true,
                    available: true
                }
            });
        return jwt.sign({ user }, process.env.ACCESS_TOKEN_SECRET as string);
    }

    logout = async (email: string)=>{
        await db.User.updateOne(
            { user_email: email },
            {
                state: {
                    online: false,
                    available: false
                }
            }
        )
    }
}


const userServices = new UserServices();
export default userServices;
