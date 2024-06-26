import { ConflictException } from "../../exceptions/conflictException";
import Jwt from "../../auth/jwt";
import AuthUtils from "../../auth/utils";
import { BadRequestException } from "../../exceptions/badRequestException";
import { UserDTO, UserRequest, UserResponse } from "./user.dto";
import UserMapper from "./user.mapper";
import userRepository from "./user.schema";
import { UserService } from "./user.service";

class UserServiceImpl implements UserService  {

    async verifyIfUserExists(email: string) {
        const user = await userRepository.findOne({ email: email })
        if (user) {
            throw new ConflictException("User already exists")
        }
    }

    async createUser(user: UserRequest): Promise<void> {
        if (!user) {
            throw new BadRequestException("User is required")
        }
        const encryptedPassword = AuthUtils.encryptPassword(user.password)
        const isPasswordConfirmationValid = AuthUtils.verifyPassword(user.password_confirmation, encryptedPassword.salt, encryptedPassword.hash) 
        if (!isPasswordConfirmationValid) {
            throw new BadRequestException("Password and password confirmation doesn't match")
        }
        await this.verifyIfUserExists(user.email);

        const newUser = UserMapper.toEntity(user, encryptedPassword)
        await userRepository.create(newUser)
    }

    async login(email: string, password: string): Promise<string> {
        const user: UserDTO | null = await userRepository.findOne({ email });
        if (!user) {
            throw new BadRequestException("User not found.");
        }
        const isPasswordValid = AuthUtils.verifyPassword(password, user.password_salt || "", user.password || "");
        if (!isPasswordValid) {
            throw new BadRequestException("Invalid password.");
        }
        const token = Jwt.generateToken({ email: user.email || "", username: user.username || "", _id: user._id || "" });
        return token;
    }

    async getUser(id: string): Promise<UserResponse> {
        const user = await userRepository.findById(id);
        if (user == null) {
            throw new BadRequestException("User not found.");
        }
        const userResponse = UserMapper.toResponse(user);
        return userResponse as UserResponse;
    }

    async getUsers(): Promise<UserResponse[]> {
        const users = await userRepository.find();
        const allUsers : UserResponse[] = await Promise.all(users.map(async user => {
            const userResponse = UserMapper.toResponse(user);
            return userResponse;
        }))
        return allUsers as unknown as Promise<UserResponse[]>;
    }
    
    async updateUser(id: string, user: UserRequest): Promise<void> {
        const userFind = await this.getUser(id)
        if (userFind.email !== user.email) {
            await this.verifyIfUserExists(user.email)
        }
        
        const encryptedPassword = AuthUtils.encryptPassword(user.password)
        const isPasswordConfirmationValid = AuthUtils.verifyPassword(
            user.password_confirmation, 
            encryptedPassword.salt, 
            encryptedPassword.hash)
        if (!isPasswordConfirmationValid) {
            throw new BadRequestException("Password and password confirmation doesn't match")
        }
        await userRepository.findByIdAndUpdate(id, user);
    }

    async deleteUser(id: string): Promise<void> {
        await this.getUser(id);
        await userRepository.deleteOne({ _id: id });
    }

}

export default new UserServiceImpl()