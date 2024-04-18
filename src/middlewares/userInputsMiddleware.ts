import { NextFunction, Request, Response } from 'express';
import { body, validationResult } from 'express-validator';

export const validateUserRequest = [
    body('username').isLength({ min: 1 }).withMessage('Username is required'),
    body('email').isEmail().withMessage('Invalid email address'),
    body('password').isLength({ min: 1 }).withMessage('Password is required'),
    body('password_confirmation').isLength({ min: 1 }).withMessage('Password confirmation is required'),
    body('weight').isFloat({ min: 0 }).withMessage('Weight must be a positive number'),

    (req: Request, res: Response, next: NextFunction) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];