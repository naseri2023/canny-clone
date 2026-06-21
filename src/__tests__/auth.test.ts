import request from "supertest";
import app from "../app";

describe("Auth API", () => {
    it("should signup user", async () => {
        const res = await request(app).post("/api/v1/auth/signup").send({
            name: "test",
            email: "test@test.com",
            password: "123456",
        });

        expect(res.status).toBe(201);
        expect(res.body.success).toBe(true);
    });

    it("should signin user", async () => {
        const res = await request(app).post("/api/v1/auth/signin").send({
            email: "test@test.com",
            password: "123456",
        });

        expect(res.status).toBe(200);
        expect(res.body.data.token).toBeDefined();
    });
});