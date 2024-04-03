import { Request, Response } from 'express';

class BaseController {
    protected executeAction(action: (req: Request, res: Response) => Promise<void>) {
        return async (req: Request, res: Response) => {
            try {
                await action(req, res);
            } catch (error: any) {
                res.status(400).send({ name: error.name, message: error.message });
            }
        }
    }
}

export default BaseController;