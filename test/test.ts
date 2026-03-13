import request from "supertest";
import app from "../src/app";
import mongoose from "mongoose";
import { connectMongo } from "../src/infra/db/mongo";

describe("Tasks API", () => {

    let taskId: string;
    beforeAll(async () => {
        await connectMongo();
    });

    afterAll(async () => {
        await mongoose.connection.close();
    });
    afterAll(async () => {

        await new Promise(resolve => setTimeout(resolve, 2000));

        await mongoose.connection.close();

    });

    it("should create a new task", async () => {

        const res = await request(app)
            .post("/tasks")
            .send({ imagePath: "./input/test.jpg" });

        expect(res.status).toBe(201);
        expect(res.body.taskId).toBeDefined();
        expect(res.body.status).toBe("pending");
        expect(res.body.price).toBeDefined();

        taskId = res.body.taskId;

    });

    it("should retrieve an existing task", async () => {

        const res = await request(app).get(`/tasks/${taskId}`);

        expect(res.status).toBe(200);
        expect(res.body.id).toBe(taskId);
        expect(res.body.status).toBeDefined();

    });

    it("should return 404 for non-existing task", async () => {

        const res = await request(app).get("/tasks/fake-id");

        expect(res.status).toBe(404);

    });

    it("should return 400 when creating task without imagePath", async () => {

        const res = await request(app)
            .post("/tasks")
            .send({});

        expect(res.status).toBe(400);

    });

    it("should return processed images after completion", async () => {

        const res = await request(app).get(`/tasks/${taskId}`);

        expect(res.status).toBe(200);

        if (res.body.status === "completed") {
            expect(res.body.images).toBeDefined();
            expect(Array.isArray(res.body.images)).toBe(true);
        }

    });

});

