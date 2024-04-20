import { describe, expect, it } from "@jest/globals";
import * as request from "supertest";
import app from "../app";

const userMock = {
    username: "User Test",
    password: "senha123",
    password_confirmation: "senha123",
    email: `email${Math.random()}@email.com`,
    weight: 40.0
}
var token: string = "";

describe("Testing user endpoints", () => {
    it("Must insert an user in the database", async () => {
        const response = await request.default(app).post("/register").send(userMock)

        expect(response.status).toEqual(201)
        expect(response.body).toHaveProperty("message")
        expect(response.body.message).toEqual("User created successfully")
    })

    it("Must login an user in the database", async () => {
        const response = await request.default(app).post("/login").send({
            email: userMock.email,
            password: userMock.password
        })

        expect(response.status).toEqual(200)
        expect(response.body).toHaveProperty("token")
        token = response.body.token
    })

    it("Must update an user in the database", async () => {
        userMock.username = "User Test Updated"
        const response = await request.default(app)
            .put(`/user`)
            .set('Authorization', `Bearer ${token}`)
            .send(userMock)

        const userUpdated = await request.default(app).get(`/user`).set('Authorization', `Bearer ${token}`)
    
        expect(response.status).toEqual(202)
        expect(userUpdated.body.username).toEqual("User Test Updated")
    })

    it("Must return all users from the database", async () => {
        const response = await request.default(app).get("/user/all").set('Authorization', `Bearer ${token}`)

        expect(response.status).toEqual(200)
        expect(response.body).toBeInstanceOf(Array)
    })

    it("Must return the logged user from the database", async () => {
        const response = await request.default(app).get(`/user`).set('Authorization', `Bearer ${token}`)

        expect(response.status).toEqual(200)
        expect(response.body).toHaveProperty("username")
        expect(response.body).toHaveProperty("email")
        expect(response.body).toHaveProperty("weight")
    })

    it("Must delete an user from the database", async () => {
        const responseDelete = await request.default(app).delete(`/user`).set('Authorization', `Bearer ${token}`)
        const searchDeletedUser = await request.default(app).get(`/user`).set('Authorization', `Bearer ${token}`)

        expect(responseDelete.status).toEqual(200)
        expect(searchDeletedUser.status).toEqual(403)
    })

})