export class NotFoundException extends Error {
    statusCode: number;
    constructor(message: string) {
        super(message);
        this.statusCode = 404;
        this.name = 'Not Found Exception';
    }
}