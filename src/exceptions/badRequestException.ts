export class BadRequestException extends Error {
    statusCode: number;
    constructor(message: any) {
        super(message);
        this.name = 'Bad Request Exception';
        this.statusCode = 400;
    }
}