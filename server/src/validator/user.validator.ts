import { body } from "express-validator";
import userService from "../services/user.services";

class UserValidator {
    register = [
        // body("fullName")
        //     .isEmpty()
        //     .withMessage("Must provide a Name"),
        body("email")
            .isEmail()
            .normalizeEmail()
            .withMessage("Must provide a valid email address"),
        // custom validator with database 
        body("password")
            .isLength({ min: 8, max: 24 })
            .withMessage("Password must be 8 to 24 letters"),
        body('email').custom(async (value) => {
            const user = await userService.findUserByEmail(value);

            if (user) {
                return Promise.reject('User with that email already exists.');
            }
            return true;
        }),
    ]
}

const userValidator = new UserValidator();
export default userValidator;