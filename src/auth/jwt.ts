import jwt from 'jsonwebtoken';

interface PayloadUser {
    username: string,
    email: string,
    _id: string
}

class Jwt {
    public static generateToken(payloadUser: PayloadUser): string {
        let payload = {
            "username": payloadUser.username,
            "email": payloadUser.email,
            "id": payloadUser._id
        }

        let key = "minhaChaveSecreta"
        var token = jwt.sign({
            data: payload
        }, key, { expiresIn: 60 * 60, algorithm: 'HS256'});
        
        return token
    }
}

export default Jwt