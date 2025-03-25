const request = require("supertest");
const configureTest = require("./test.config");
const app = require("../src/app");

configureTest();

describe("GET /api/v1/users/", () => {
  it("should return all users", async () => {
    const res = await request(app).get("/api/v1/users/");
    expect([200, 404]).toContain(res.statusCode);
    if (res.statusCode === 200) {
      console.log(res.body)
    } else if (res.statusCode === 404) {
      expect(res.body.message).toBe("No users found.");
    }
    console.log(res.body)
  });
});

describe("GET /api/v1/users/:userId", () => {
  it("should return a user by id", async () => {
    const res = await request(app).get(
      "/api/v1/users/669e725f77257464a1ed4431"
    );
    expect([200, 404]).toContain(res.statusCode);
    if (res.statusCode === 200) {
      expect(res.body).toHaveProperty("user");
    } else if (res.statusCode === 404) {
      expect(res.body.message).toBe("User not found.");
    }
    console.log(res.body)
  });
});

describe("POST /api/v1/users/", () => {
  it("should create a new user", async () => {
    const res = await request(app).post("/api/v1/users/").send({
      fullName: "User Test",
      email: "test5@gmail.com",
      password: "test@1234",
      phoneNumber: "+910123456789",
    });
    expect([201, 409]).toContain(res.statusCode);
    if (res.statusCode === 201) {
      expect(res.body.message).toBe("User created successfully.");
    } else if (res.statusCode === 409) {
      expect(res.body.message).toBe("User already exists.");
    }
    console.log(res.body.message)
  });
});

describe("POST /api/v1/users/newpassword", () => {
  it("should change user password", async () => {
    const res = await request(app)
      .post("/api/v1/users/669e725f77257464a1ed4431/newpassword")
      .send({
        password: "test@12345",
      });
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe("Password changed successfully.");
  });
});

describe("PUT /api/v1/users/:userId", () => {
  it("should update a user by id", async () => {
    const res = await request(app)
      .put("/api/v1/users/669e725f77257464a1ed4431")
      .send({
        fullName: "User Test2",
        email: "test1@gmail.com",
        password: "test@1234",
        phoneNumber: "+910123456789",
      });
    expect([200,404]).toContain(res.statusCode);
    if (res.statusCode === 200) {
      expect(res.body.message).toBe("User details updated successfully.");
    } else if (res.statusCode === 404) {
      expect(res.body.message).toBe("User not found.");
    }
    console.log(res.body.message)
  });
});

describe("DELETE /api/v1/users/:userId", () => {
  it("should delete a user by id", async () => {
    const res = await request(app).delete(
      "/api/v1/users/669e725f77257464a1ed4431"
    );
    expect([200,404]).toContain(res.statusCode);
    if (res.statusCode === 200) {
      expect(res.body.message).toBe("User deleted successfully.");
    } else if (res.statusCode === 404) {
      expect(res.body.message).toBe("User not found.");
    }
    console.log(res.body.message)
  });
});
