import { describe, it, expect } from "vitest";
import { app } from "@/http/server";
import request from "supertest";

describe("POST /log-in", async () => {
  it("should successfully authenticate an customer", async () => {
    await request(app.server)
     .post("/sign-in")
     .send({
        name: "John Doe",
        email: "johndoe@gmail.com",
        password: "john123"
      });
    
    const response = await request(app.server)
      .post("/log-in")
      .send({
        email: "johndoe@gmail.com",
        password: "john123"
      });
      
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("token");
  });
  
  it("should not authenticate an customer with invalid password", async () => {
    const response = await request(app.server)
      .post("/log-in")
      .send({
        email: "johndoe@gmail.com",
        password: "invalid-password"
      });
      
    expect(response.status).toBe(400);
    expect(response.body.message).toBe("Invalid password.");
  });
  
  it("should not authenticate an inexistent customer", async () => {
    const response = await request(app.server)
      .post("/log-in")
      .send({
        email: "janedoe@gmail.com",
        password: "jane123"
      });
      
    expect(response.status).toBe(400);
    expect(response.body.message).toBe("This customer don't exists.");
  });
});