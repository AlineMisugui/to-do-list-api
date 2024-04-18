import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken'
import userImplService from "../../src/domain/user/userImpl.service";
import { UserResponse } from "src/domain/user/user.dto";

declare global {
    namespace Express {
        interface Request {
            user: UserResponse;
        }
    }
}

export const authenticate = async (req: Request, res: Response, next: NextFunction) => {
    const headers = req.headers as { authorization?: string };
    const bearerToken = headers.authorization;
    let key = "minhaChaveSecreta"

    if (!bearerToken) {
        return res.status(401).send({ message: 'Token is required' });
    }

    const token = bearerToken?.split(' ')[1];

    jwt.verify(
        token,
        key,
        async (erro: any, decode: any) => {
            if (erro) {
                return res.status(403).send({ message: 'Invalid token' });
            }
            const userId = decode.data.id;
            if (!userId) {
                return res.status(403).send({ message: 'Invalid token' });
            }
            const user = await userImplService.getUser(userId);
            if (!user) {
                return res.status(403).send({ message: 'Invalid token' });
            }
            req.user = user;

            next();
        }
    )
}