import { it, expect, describe } from "@jest/globals";
import * as request from "supertest";
import app from "../app";
import { CategoryRequest } from "src/domain/category/category.dto";
import { TaskRequest } from "src/domain/task/task.dto";

const taskMock: TaskRequest = {
    title: "Teste",
    description: "Teste descrição",
    type: "Urgente",
    status: "PENDING",
    categoryId: ""
}
var taskId = "";

const categoryMock = {
    name: "Teste",
    color: "#000000"
}
var categoryId = "";

const userMock = {
    username: "User Test",
    password: "senha123",
    password_confirmation: "senha123",
    email: `email${Math.random()}@email.com`,
    weight: 40.0
}
var token: string = "";

describe("Testing task endpoints", () => {
    it("Must insert a task in the database", async () => {
        await request.default(app).post("/register").send(userMock)
        const responseLogin = await request.default(app).post("/login").send({
            email: userMock.email,
            password: userMock.password
        })
        token = responseLogin.body.token

        const createCategory = await request.default(app).post("/category").send(categoryMock)
            .set("Authorization", `Bearer ${token}`)

        const categoryRandom = await request.default(app).get("/category/by-user").set('Authorization', `Bearer ${token}`)
        categoryId = categoryRandom.body[0].id

        taskMock.categoryId = categoryId

        const createTask = await request.default(app).post("/task").send(taskMock).set("Authorization", `Bearer ${token}`)
        expect(createTask.status).toBe(201)
        expect(createTask.body).toHaveProperty("message")
        expect(createTask.body.message).toEqual("Task created successfully")
    })

    it("Must return all tasks of logged user from the database", async () => {
        const response = await request.default(app).get("/task/by-user").set('Authorization', `Bearer ${token}`)

        expect(response.status).toEqual(200)
        expect(response.body).toBeInstanceOf(Array)
        taskId = response.body[0].id
    })

    it("Must return a task from the database", async () => {
        const response = await request.default(app).get(`/task/${taskId}`).set('Authorization', `Bearer ${token}`)

        expect(response.status).toEqual(200)
        expect(response.body).toHaveProperty("category")
        expect(response.body).toHaveProperty("title")
        expect(response.body).toHaveProperty("description")
        expect(response.body).toHaveProperty("conclusion")
        expect(response.body).toHaveProperty("type")
        expect(response.body).toHaveProperty("user")
        expect(response.body).toHaveProperty("status")
        expect(response.body.id).toEqual(taskId)
    })

    it("Must update a task in the database", async () => {
        taskMock.title = "Teste Updated" 
        const response = await request.default(app)
            .put(`/task/${taskId}`)
            .set('Authorization', `Bearer ${token}`)
            .send(taskMock)

        expect(response.status).toEqual(202)
        expect(response.body.message).toEqual("Task updated successfully")
    })


    it("Must delete a task in the database", async () => {
        const response = await request.default(app).delete(`/task/${taskId}`).set('Authorization', `Bearer ${token}`)
        const getTaskAfterDelete = await request.default(app).get(`/task/${taskId}`)
            .set('Authorization', `Bearer ${token}`)

        expect(response.status).toEqual(200)
        expect(response.body).toHaveProperty("message")
        expect(response.body.message).toEqual("Task deleted successfully")
        expect(getTaskAfterDelete.status).toEqual(404)
        expect(getTaskAfterDelete.body).toHaveProperty("message")
        expect(getTaskAfterDelete.body.message).toEqual("Task not found.")

        await request.default(app).delete(`/category/${categoryId}`).set('Authorization', `Bearer ${token}`)
        await request.default(app).delete(`/user`).set('Authorization', `Bearer ${token}`)
    })

})
