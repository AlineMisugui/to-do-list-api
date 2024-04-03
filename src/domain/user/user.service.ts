import { UserRequest, UserResponse } from "./user.dto";

export interface UserService {
    createUser(user: any): Promise<void>;
    getUser(id: string): Promise<UserResponse>;
    getUsers(): Promise<UserResponse[]>;
    updateUser(id: string, user: UserRequest): Promise<UserResponse>;
    deleteUser(id: string): Promise<void>;
}