import { body } from "express-validator";
import dealershipServices from "../services/dealer.services";

class DealerValidator {
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
            const user = await dealershipServices.findDealershipByEmail(value);

            if (user) {
                return Promise.reject('User with that email already exists.');
            }
            return true;
        }),
    ]
}

const dealershipValidator = new DealerValidator();
export default dealershipValidator;