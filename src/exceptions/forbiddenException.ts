export class ForbiddenException extends Error {
    statusCode: number;
    constructor(message: any) {
        super(message);
        this.name = 'Forbidden Exception';
        this.statusCode = 403;
    }
}