const crypto = require('crypto');

class AuthUtils {
    public static encryptPassword(password: string): {salt: string, hash: string} {
        const salt = crypto.randomBytes(16).toString('hex');
        const hash = crypto.pbkdf2Sync(password, salt,
            1000, 64, `sha512`).toString(`hex`);
        return { salt, hash };
    }

    public static verifyPassword(password: string, salt: string, storedHash: string): boolean {
        const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, `sha512`).toString(`hex`);
        return hash === storedHash;
    }
}

export default AuthUtils