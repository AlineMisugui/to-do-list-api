import { NextFunction, Request, Response } from 'express';
import { body, validationResult } from 'express-validator';

export const validateTaskRequest = [
    body('title').isLength({ min: 1 }).withMessage('Title is required'),
    body('description').isLength({ min: 1 }).withMessage('Description is required'),
    body('conclusion').isISO8601().withMessage('Invalid date format').optional(),
    body('type').isLength({ min: 1 }).withMessage('Type is required'),
    body('categoryId').isLength({ min: 1 }).withMessage('Category is required'),
    body('status').isIn(["PENDING", "IN_COURSE", "FINALIZED"]).withMessage('Invalid status'),

    (req: Request, res: Response, next: NextFunction) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

    