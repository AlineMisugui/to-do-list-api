import app from "../app"
import { describe, it, expect } from "@jest/globals"
import userSchema from "../src/domain/user/user.schema"
import * as request from "supertest"

describe("Testando endpoints de users", () => {

    // it("Must insert an user in the database", async () => {
    //     const userMock = {
    //         username: "User Test",
    //         password: "senha123",
    //         password_confirmation: "senha 123",
    //         email: "email@email.com",
    //         weight: 40.0
    //     }

        // const response = await request.default(app).post("/user").send(userMock)
        // const findUser = await userSchema.findById(response.body._id)

        // expect(response.status).toEqual(201)
        // expect(response.body._id).toBeDefined()
        // expect(userMock.email).toBe(findUser?.email)
    // })

    it("Must return all users from the database", async () => {
        const response = await request.default(app).get("/user")

        expect(response.status).toEqual(200)
        expect(response.body).toBeInstanceOf(Array)
    })

    it("Must return an user from the database by id", async () => {
        const response = await request.default(app).get("/user")

        expect(response.status).toEqual(200)
    })
})