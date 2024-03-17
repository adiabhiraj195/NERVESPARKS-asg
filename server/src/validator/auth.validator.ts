import { body } from "express-validator";

class AuthValidator {
    login = [
        body("email")
            .isEmail()
            .normalizeEmail()
            .withMessage("Must Provide a valid email"),
        body('password').exists().withMessage('Must provide a password.')
    ]
}

const authValidator = new AuthValidator();

export { authValidator };