import AuthUtils from "../../auth/utils";
import { BadRequestException } from "../../exceptions/badRequestException";
import { UserRequest, UserResponse } from "./user.dto";
import UserMapper from "./user.mapper";
import userRepository from "./user.schema";
import { UserService } from "./user.service";

export class UserServiceImpl implements UserService  {

    async verifyIfUserExists(email: string) {
        const user = await userRepository.findOne({ email: email });
        if (user) {
            throw new BadRequestException("User already exists.");
        }
    }

    async createUser(user: UserRequest): Promise<void> {
        if (!user) {
            throw new BadRequestException("User is required.")
        }
        const encryptedPassword = AuthUtils.encryptPassword(user.password)
        const isPasswordConfirmationValid = AuthUtils.verifyPassword(user.password_confirmation, encryptedPassword.salt, encryptedPassword.hash) 
        if (!isPasswordConfirmationValid) {
            throw new BadRequestException("Password and password confirmation doesn't match")
        }
        await this.verifyIfUserExists(user.email);

        const newUser = UserMapper.toEntity(user, encryptedPassword);
        await userRepository.create(newUser);
    }

    async getUser(id: string): Promise<UserResponse> {
        const user = await userRepository.findById(id);
        if (!user) {
            throw new BadRequestException("User not found.");
        }
        return user as UserResponse;
    }

    getUsers(): Promise<UserResponse[]> {
        const users = userRepository.find();
        return users as unknown as Promise<UserResponse[]>;
    }
    
    updateUser(id: string, user: UserRequest): Promise<UserResponse> {
        this.getUser(id)
        const encryptedPassword = AuthUtils.encryptPassword(user.password)
        const isPasswordConfirmationValid = AuthUtils.verifyPassword(
            user.password_confirmation, 
            encryptedPassword.salt, 
            encryptedPassword.hash)
        if (!isPasswordConfirmationValid) {
            throw new BadRequestException("Password and password confirmation doesn't match")
        }
        const updatedUser = UserMapper.toEntity(user, encryptedPassword);
        return userRepository.findByIdAndUpdate(id, updatedUser) as unknown as Promise<UserResponse>;
    }

    async deleteUser(id: string): Promise<void> {
        await this.getUser(id);
        await userRepository.deleteOne({ _id: id });
    }

}