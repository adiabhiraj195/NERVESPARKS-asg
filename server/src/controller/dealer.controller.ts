import { Request, Response } from "express";
import { validationResult } from "express-validator";
import dealershipServices from "../services/dealer.services";
import userServices from "../services/user.services";

class DealershipController {
    register = async (req: Request, res: Response) => {
        const err = validationResult(req);
        if (!(err.isEmpty())) {
            console.log(err);
            return res.status(400).json(err);
        }

        const { name, email, password } = req.body;

        await dealershipServices.createDealership(name, email, password);

        return res.status(200).json("Dealership created successfully.");
    }

    login = async (req: Request, res: Response) => {
        const err = validationResult(req);
        if (!(err.isEmpty())) {
            return res.status(400).json(err);
        }

        const { email, password } = req.body;

        const user = await dealershipServices.findDealershipByEmail(email);

        if (!user) {
            return res.status(400).json({
                error: "Usern does not found",
            });
        }

        const checkPassword = await userServices.checkPassword(password, user.password as string);

        if (!checkPassword) {
            return res.status(400).json({
                error: "Password is not correct",
            });
        }

        const authResponse = await dealershipServices.loginResponse(user);
        return res.status(200).json(authResponse);
    }
}

const dealershipController = new DealershipController();
export default dealershipController;