import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import supertest from "supertest";
import { UserRole } from "../../shared/enums/userRole.enum";
import { UserDAO } from "../../shared/models/userDAO.model";
import createExpressServer from "../../service/server";
import { AdvertisementDAO } from "../../shared/models/advertisementDAO.model";
import { CategoryEnum } from "../../shared/enums/category.enum";
import moment, { now } from "moment";
import { AdvertisementEventDAO } from "../../shared/models/advertisementEventDAO.model";

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

describe("Advertisement", () => {
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

  describe("POST /api/advertisement/add", () => {
    it("should create new advertisement", async () => {
      const event: Partial<AdvertisementEventDAO> = {
        title: "test",
        start: "2024-01-10T09:00:00+01:00",
        end: "2024-01-10T10:30:00+01:0",
        allDay: false,
        editable: false,
      };

      const dataToSave: any = {
        userId: createdUser.body.userId,
        title: "test",
        category: CategoryEnum.SCIENCE,
        description: "test",
        price: "20",
        startDate: "2024-01-09T23:00:00.000Z",
        endDate: "2024-01-16T23:00:00.000Z",
        events: [event],
      };

      const response = await supertest(app.app)
        .post("/api/advertisement/add")
        .send(dataToSave)
        .set("Authorization", userToken);

      expect(response.statusCode).toBe(201);
      expect(response.body).toBeDefined();
    });

    it("should return 401 when JWT token is not provided", async () => {
      const event: Partial<AdvertisementEventDAO> = {
        title: "test",
        start: "2024-01-10T09:00:00+01:00",
        end: "2024-01-10T10:30:00+01:0",
        allDay: false,
        editable: false,
      };

      const dataToSave: any = {
        userId: createdUser.body.userId,
        title: "test",
        category: CategoryEnum.SCIENCE,
        description: "test",
        price: "20",
        startDate: "2024-01-09T23:00:00.000Z",
        endDate: "2024-01-16T23:00:00.000Z",
        events: [event],
      };

      const response = await supertest(app.app)
        .post("/api/advertisement/add")
        .send(dataToSave);

      expect(response.statusCode).toBe(401);
    });
  });
});
