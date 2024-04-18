import crypto from 'crypto';
import jwt from 'jsonwebtoken';

export interface PayloadUser {
    username: string,
    email: string,
    _id: string
}

class Jwt {
    public static generateToken(payloadUser: PayloadUser): string {
        let header = {
            "alg": "HS256",
            "typ": "JWT"
        }
        let headerBase64 = Buffer.from(JSON.stringify(header)).toString('base64')

        let payload = {
            "username": payloadUser.username,
            "email": payloadUser.email,
            "id": payloadUser._id
        }
        let payloadBase64 = Buffer.from(JSON.stringify(payload)).toString('base64')

        let key = "minhaChaveSecreta"
        var token = jwt.sign({
            data: payload
        }, key, { expiresIn: 60 * 60, algorithm: 'HS256'});
        
        return token
    }
}

export default Jwt