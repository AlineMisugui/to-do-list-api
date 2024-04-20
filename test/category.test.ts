import { describe, expect, it } from "@jest/globals";
import * as request from "supertest";
import app from "../app";

const categoryMock = {
    name: "Teste",
    color: "#000000"
}

const userMock = {
    username: "User Test",
    password: "senha123",
    password_confirmation: "senha123",
    email: `email${Math.random()}@email.com`,
    weight: 40.0
}
var token: string = "";

var categoryId = "";

describe("Testing category endpoints", () => {
    it("Must insert a category in the database", async () => {
        await request.default(app).post("/register").send(userMock)
        const responseLogin = await request.default(app).post("/login").send({
            email: userMock.email,
            password: userMock.password
        })
        token = responseLogin.body.token

        const createCategory = await request.default(app).post("/category").send(categoryMock).set("Authorization", `Bearer ${token}`)
        expect(createCategory.status).toBe(201)
        expect(createCategory.body).toHaveProperty("message")
        expect(createCategory.body.message).toEqual("Category created successfully")
    })

    it("Must return all categories of logged user from the database", async () => {
        const response = await request.default(app).get("/category/by-user").set('Authorization', `Bearer ${token}`)

        expect(response.status).toEqual(200)
        expect(response.body).toBeInstanceOf(Array)

        categoryId = response.body[0].id
    })

    it("Must return a category from the database", async () => {
        const response = await request.default(app).get(`/category/${categoryId}`).set('Authorization', `Bearer ${token}`)

        expect(response.status).toEqual(200)
        expect(response.body).toHaveProperty("name")
        expect(response.body).toHaveProperty("color")
        expect(response.body).toHaveProperty("user")
        expect(response.body.id).toEqual(categoryId)
    })

    it("Must update a category in the database", async () => {
        categoryMock.name = "Teste Updated"
        const response = await request.default(app)
            .put(`/category/${categoryId}`)
            .set('Authorization', `Bearer ${token}`)
            .send(categoryMock)

        const categoryUpdated = await request.default(app).get(`/category/${categoryId}`).set('Authorization', `Bearer ${token}`)

        expect(response.status).toEqual(202)
        expect(categoryUpdated.body.name).toEqual("Teste Updated")
    })

    it("Must delete a category in the database", async () => {
        const response = await request.default(app).delete(`/category/${categoryId}`).set('Authorization', `Bearer ${token}`)
        const getCategoryAfterDelete = await request.default(app).get(`/category/${categoryId}`)
            .set('Authorization', `Bearer ${token}`)
        expect(response.status).toEqual(200)
        expect(response.body).toHaveProperty("message")
        expect(response.body.message).toEqual("Category deleted successfully")
        expect(getCategoryAfterDelete.status).toEqual(404)
        expect(getCategoryAfterDelete.body).toHaveProperty("message")
        expect(getCategoryAfterDelete.body.message).toEqual("Category not found.")

        await request.default(app).delete(`/user`).set('Authorization', `Bearer ${token}`)
    })
})