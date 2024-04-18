export class BadRequestException extends Error {
    statusCode: number;
    constructor(message: string) {
        super(message);
        this.name = 'Bad Request Exception';
        this.statusCode = 400;
    }
}