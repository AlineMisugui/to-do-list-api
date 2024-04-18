import { Request, Response } from 'express';

class BaseController {
    protected executeAction(action: (req: Request, res: Response) => Promise<void>) {
        return async (req: Request, res: Response) => {
            try {
                await action(req, res);
            } catch (error: any) {
                return res.status(error.statusCode ? error.statusCode : 500).send({ message: error.message ? error.message : "Internal server error" });
            }
        }
    }
}

export default BaseController;