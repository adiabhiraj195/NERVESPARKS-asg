import db from "../db";
import { genSalt, hash } from "bcrypt";
import  jwt from "jsonwebtoken";

class DealershipServices {
    createDealership = async (name: string, email: string, password: string) => {
        const salt = await genSalt();
        const hashPassword = await hash(password, salt);

        const generatedID = this.generateDealershipId();

        await db.Dealership.create({
            dealership_id: generatedID,
            dealership_email: email,
            dealership_name: name,
            password: hashPassword
        });
    }

    loginResponse = async (dealership: any) => {
        // console.log(process.env.ACCESS_TOKEN_SECRET);
        await db.Dealership.updateOne(
            { dealership_email: dealership.dealership_email },
            {
                state: {
                    online: true,
                    available: true
                }
            });
        return jwt.sign({ dealership }, process.env.ACCESS_TOKEN_SECRET as string);
    }

    generateDealershipId = (): string => {
        return "dealerId" + Math.random().toString(16).slice(2);
    }

    findDealershipByEmail = async (email: string) => {
        return await db.Dealership.findOne({ dealership_email: email })
    }
}

const dealershipServices = new DealershipServices();
export default dealershipServices;