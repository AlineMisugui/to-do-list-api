export interface UserRequest {
    username: string,
    email: string,
    password: string,
    password_confirmation: string,
    weight: number
}

export interface UserResponse {
    username: string,
    email: string,
    weight: number
}

export interface Password {
    hash: string,
    salt: string
}

export type UserRequestType = Request & { body: UserRequest };