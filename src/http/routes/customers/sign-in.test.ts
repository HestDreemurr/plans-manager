import { describe, it, expect } from "vitest";
import { app } from "@/http/server";
import request from "supertest";

describe("POST /sign-in", () => {
  it("should successfully create an customer", async () => {
    const response = await request(app.server)
      .post("/sign-in")
      .send({
        name: "John Doe",
        email: "johndoe@gmail.com",
        password: "john123"
      });
      
    expect(response.status).toBe(201);
  });
  
  it("should not be able create two customers with the same email", async () => {
    const response = await request(app.server)
      .post("/sign-in")
      .send({
        name: "John Doe",
        email: "johndoe@gmail.com",
        password: "john123"
      });
      
    expect(response.status).toBe(409);
    expect(response.body.message).toBe("This customer already exists.");
  });
  
  it("should not create an customer with invalid data", async () => {
    const response = await request(app.server)
      .post("/sign-in")
      .send({
        name: "JD",
        email: "jd.com",
        password: "jdd"
      });
      
    expect(response.status).toBe(400);
  });
});