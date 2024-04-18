export class ConflictException extends Error {
    statusCode: number;
    constructor(message: any) {
        super(message);
        this.name = 'Conflict Exception';
        this.statusCode = 409;
    }
}