import { Request, Response } from "express";
import { validationResult } from "express-validator";
import userService from "../services/user.services";

class UsersController {
    register = async (req: Request, res: Response) => {
        const err = validationResult(req);
        if (!(err.isEmpty())) {
            console.log(err);
            return res.status(400).json(err);
        }

        const { name, email, password } = req.body;

        await userService.createUser(name, email, password);

        return res.status(200).json("User created successfully.");
    }
    login = async (req: Request, res: Response) => {
        const err = validationResult(req);
        if (!(err.isEmpty())) {
            return res.status(400).json(err);
        }

        const { email, password } = req.body;

        const user = await userService.findUserByEmail(email);

        if (!user) {
            return res.status(400).json({
                error: "Usern does not found",
            });
        }

        const checkPassword = await userService.checkPassword(password, user.password as string);

        if (!checkPassword) {
            return res.status(400).json({
                error: "Password is not correct",
            });
        }

        const authResponse = await userService.loginResponse(user);
        return res.status(200).json(authResponse);
    }

    logout = async (req: Request, res: Response) => {
        const err = validationResult(req);
        if (!(err.isEmpty())) {
            return res.status(400).json(err);
        }

        const { email, password } = req.body;


        await userService.logout(email);
        return res.json({
            msg: "Loged out"
        })
    }
}

const usersController = new UsersController();
export default usersController;