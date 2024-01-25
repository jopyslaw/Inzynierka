import createExpressServer from "../../service/server";
import supertest from "supertest";
import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import { UserDAO } from "../../shared/models/userDAO.model";
import { UserRole } from "../../shared/enums/userRole.enum";

const mockUserData: UserDAO = {
  email: "test@com.pl",
  name: "test",
  surname: "test",
  login: "test",
  role: UserRole.ADMIN,
  active: true,
  isAdmin: true,
  password: "test",
  phoneNumber: "123456788",
};

const app = createExpressServer();

describe("User", () => {
  let createdUser: any;
  let userToken: string;

  beforeAll(async () => {
    const mongoServer = await MongoMemoryServer.create();
    await mongoose.connect(mongoServer.getUri());

    createdUser = await supertest(app.app)
      .post("/api/user/create")
      .send(mockUserData);

    const response = await supertest(app.app)
      .post("/api/user/auth")
      .send({ login: mockUserData.login, password: mockUserData.password });

    userToken = response.body.token;
  });

  afterAll(async () => {
    createdUser = {};
    userToken = "";
    await mongoose.disconnect();
    await mongoose.connection.close();
  });

  describe("POST /api/user/create", () => {
    it("should create new user", async () => {
      const mockUserData: UserDAO = {
        email: "test1@com.pl",
        name: "test1",
        surname: "test1",
        login: "test1",
        role: UserRole.ADMIN,
        active: true,
        isAdmin: true,
        password: "test",
        phoneNumber: "123456789",
      };

      const response = await supertest(app.app)
        .post("/api/user/create")
        .send(mockUserData);

      expect(response.statusCode).toBe(201);
    });

    it("should return 400 when required field is not provided", async () => {
      const mockUserData: Partial<UserDAO> = {
        email: "test@com.pl",
        name: "test",
        surname: "test",
        login: "test",
        role: UserRole.ADMIN,
        active: true,
        isAdmin: true,
        password: "test",
      };

      const response = await supertest(app.app)
        .post("/api/user/create")
        .send(mockUserData);

      expect(response.statusCode).toBe(400);
    });
  });

  describe("POST /api/user/auth", () => {
    it("should return JWT token when user give correct data to sign in", async () => {
      const userLoginData = {
        login: "test",
        password: "test",
      };

      const response = await supertest(app.app)
        .post("/api/user/auth")
        .send(userLoginData);

      expect(response.statusCode).toBe(200);
      expect(response.body.token).toBeDefined();
      expect(response.body.token).not.toBe("");
    });

    it("should return 404 when provided data is not correct to sign in", async () => {
      const userLoginData = {
        login: "test12",
        password: "test12",
      };

      const response = await supertest(app.app)
        .post("/api/user/auth")
        .send(userLoginData);

      expect(response.statusCode).toBe(404);
      expect(response.error).toBeTruthy();
    });
  });

  describe("GET /api/user/data/:userId", () => {
    it("should return user data", async () => {
      const response = await supertest(app.app)
        .get("/api/user/data/" + createdUser.body.userId)
        .set("Authorization", userToken);

      expect(response.statusCode).toBe(200);
    });

    it("should return 404 when user not exists", async () => {
      const response = await supertest(app.app)
        .get("/api/user/data/")
        .set("Authorization", userToken);

      expect(response.statusCode).toBe(404);
    });

    it("should return 401 when JWT token is not provided", async () => {
      const response = await supertest(app.app).get(
        "/api/user/data/" + createdUser.body.userId
      );

      expect(response.statusCode).toBe(401);
    });
  });
});
