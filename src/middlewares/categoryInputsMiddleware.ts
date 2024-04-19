import { NextFunction, Request, Response } from 'express';
import { body, validationResult } from 'express-validator';

export const validateCategoryRequest = [
    body('name').isLength({ min: 1 }).withMessage('Name is required'),
    body('color').isLength({ min: 1 }).withMessage('Color is required'),

    (req: Request, res: Response, next: NextFunction) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];
