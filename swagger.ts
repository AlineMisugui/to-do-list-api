import swaggerJsdoc from 'swagger-jsdoc';

const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        servers: [
            {
                url: 'http://localhost:3000/',
            },
        ],
        info: {
            title: 'To-Do List API',
            version: '1.0.0',
            description: 'A simple Express To-Do List API',
        },
    },
    apis: [`${__dirname}/swaggerDefinitions.ts`],
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

export default swaggerSpec;
