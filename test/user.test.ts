import app from "../app"
import { describe, it, expect } from "@jest/globals"
import userSchema from "../src/domain/user/user.schema"
import * as request from "supertest"

describe("Testando endpoints de users", () => {
    const userMock = {
        username: "User Test",
        password: "senha123",
        password_confirmation: "senha123",
        email: `email${Math.random()}@email.com`,
        weight: 40.0
    }
    var userTestId: string = "";

    it("Must insert an user in the database", async () => {
        const response = await request.default(app).post("/user").send(userMock)
        const findUser = await userSchema.findById(response.body._id)

        expect(response.status).toEqual(201)
        expect(response.body._id).toBeDefined()
        expect(userMock.email).toBe(findUser?.email)
    })

    it("Must update an user in the database", async () => {
        userMock.username = "User Test Updated"
        const response = await request.default(app).put(`/user/${userTestId}`).send(userMock)

        expect(response.status).toEqual(202)
    })

    it("Must return all users from the database", async () => {
        const response = await request.default(app).get("/user")

        expect(response.status).toEqual(200)
        expect(response.body).toBeInstanceOf(Array)
        userTestId = response.body[0]._id;
    })

    it("Must return an user from the database by id", async () => {
        const response = await request.default(app).get(`/user/${userTestId}`)

        expect(response.status).toEqual(200)
    })

    it("Must delete an user from the database", async () => {
        const responseDelete = await request.default(app).delete(`/user/${userTestId}`)

        expect(responseDelete.status).toEqual(200)
    })

})