import express from 'express'
import mongoose from 'mongoose';
import { routes } from './routes';

class App {
    express : express.Application

    constructor() {
        this.express = express()
        this.middleware()
        this.database()
        this.routes()
    }

    private middleware(): void {
        this.express.use(express.json())
    }

    private async database() {
        try {
            mongoose.set("strictQuery", true)
            await mongoose.connect("mongodb://0.0.0.0:27017/to-do-list")
            console.log("Connected to database")
        } catch (error) {
            console.log("Cannot conect database: ", error)
        }
    }

    private routes(): void {
        this.express.use(routes)
    }
}

export default new App().express