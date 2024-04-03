import { Password, UserRequest } from "./user.dto";
import userSchema from "./user.schema"

export default class UserMapper {

    public static toEntity(record: UserRequest, encryptedPassword: Password): typeof userSchema {
        const userEntity = new userSchema({
            username: record.username,
            email: record.email,
            password: encryptedPassword.hash,
            password_salt: encryptedPassword.salt,
            weight: record.weight
        });
        return userEntity as unknown as typeof userSchema;
    }
}