import { NextFunction, Request, Response, Router } from "express";
import businessContainer from "../business/business.container";
import {
  ApplicationException,
  errorUtils,
} from "../service/applicationException";
import auth from "../middleware/auth";
import roleAuth from "../middleware/role";
import { UserRole } from "../shared/enums/userRole.enum";

export const userEndpoint = (router: Router) => {
  /**
   * @swagger
   * tags:
   *   name: User
   *   description: Moduł API odpowiadający za operacja na użytkownikach
   * /api/user/auth:
   *   post:
   *     summary: Logowanie do systemu i sprawdzenie danych
   *     tags: [User]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/Advertisement'
   *     responses:
   *       200:
   *         description: Ogłoszenie zostało dodane.
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Advertisement'
   *       500:
   *         description: Bład serwera
   *
   */
  router.post(
    "/api/user/auth",
    async (request: Request, response: Response, next: NextFunction) => {
      try {
        let result = await businessContainer
          .getUserManager()
          .authenticate(request.body.login, request.body.password);
        response.status(200).send(result);
      } catch (error: any) {
        errorUtils.errorHandler(error, response);
      }
    }
  );

  /**
   * @swagger
   * tags:
   *   name: User
   *   description: Moduł API odpowiadający za operacja na użytkownikach
   * /api/user/create:
   *   post:
   *     summary: Tworzenie użytkownika
   *     tags: [User]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/Advertisement'
   *     responses:
   *       200:
   *         description: Ogłoszenie zostało dodane.
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Advertisement'
   *       500:
   *         description: Bład serwera
   *
   */
  router.post(
    "/api/user/create",
    async (request: Request, response: Response, next: NextFunction) => {
      try {
        const result = await businessContainer
          .getUserManager()
          .createNewOrUpdate(request.body);
        response.status(200).send(result);
      } catch (error: any) {
        errorUtils.errorHandler(error, response);
      }
    }
  );

  /**
   * @swagger
   * tags:
   *   name: User
   *   description: Moduł API odpowiadający za operacja na użytkownikach
   * /api/user/logout/{userId}:
   *   delete:
   *     summary: Wylogowanie użytkownika
   *     tags: [User]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/Advertisement'
   *     responses:
   *       200:
   *         description: Ogłoszenie zostało dodane.
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Advertisement'
   *       500:
   *         description: Bład serwera
   *
   */
  router.delete(
    "/api/user/logout/:userId",
    auth,
    async (request: Request, response: Response, next: NextFunction) => {
      try {
        let result = await businessContainer
          .getUserManager()
          .removeHashSession(request.body.userId);
        response.status(200).send(result);
      } catch (error: any) {
        errorUtils.errorHandler(error, response);
      }
    }
  );

  /**
   * @swagger
   * tags:
   *   name: User
   *   description: Moduł API odpowiadający za operacja na użytkownikach
   * /api/user/data/{userId}:
   *   get:
   *     summary: Pobranie danych konta dla danego użytkownika
   *     tags: [User]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/Advertisement'
   *     responses:
   *       200:
   *         description: Ogłoszenie zostało dodane.
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Advertisement'
   *       500:
   *         description: Bład serwera
   *
   */
  router.get(
    "/api/user/data/:userId",
    auth,
    async (request: Request, response: Response, next: NextFunction) => {
      try {
        const userId = request.params.userId;
        const result = await businessContainer
          .getUserManager()
          .getAccountInfo(userId);
        response.status(200).send(result);
      } catch (error: any) {
        errorUtils.errorHandler(error, response);
      }
    }
  );

  /**
   * @swagger
   * tags:
   *   name: User
   *   description: Moduł API odpowiadający za operacja na użytkownikach
   * /api/user/password/{userId}:
   *   post:
   *     summary: Zmiana hasła użytkownika
   *     tags: [User]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/Advertisement'
   *     responses:
   *       200:
   *         description: Ogłoszenie zostało dodane.
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Advertisement'
   *       500:
   *         description: Bład serwera
   *
   */
  router.post(
    "/api/user/password/:userId",
    auth,
    async (request: Request, response: Response, next: NextFunction) => {
      try {
        const userId = request.params.userId;
        const data = request.body.password;
        const result = await businessContainer
          .getUserManager()
          .updatePassword(userId, data);
        response.status(200).send(result);
      } catch (error: any) {
        errorUtils.errorHandler(error, response);
      }
    }
  );

  /**
   * @swagger
   * tags:
   *   name: User
   *   description: Moduł API odpowiadający za operacja na użytkownikach
   * /api/user/getUsersForTutors/{userId}:
   *   get:
   *     summary: Pobranie zapisanych użytkowników do danego korepetytora
   *     tags: [User]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/Advertisement'
   *     responses:
   *       200:
   *         description: Ogłoszenie zostało dodane.
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Advertisement'
   *       500:
   *         description: Bład serwera
   *
   */
  router.get(
    "/api/user/getUsersForTutors/:userId",
    roleAuth([UserRole.TUTOR]),
    async (request: Request, response: Response, next: NextFunction) => {
      try {
        const result = await businessContainer
          .getUserManager()
          .getUsersForTutors(request.params.userId);
        response.status(200).send(result);
      } catch (error: any) {
        errorUtils.errorHandler(error, response);
      }
    }
  );

  /**
   * @swagger
   * tags:
   *   name: User
   *   description: Moduł API odpowiadający za operacja na użytkownikach
   * /api/user/getTutorsForUsers/{userId}:
   *   get:
   *     summary: Pobranie zapisanych korepetytorów do danego użytkownika
   *     tags: [User]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/Advertisement'
   *     responses:
   *       200:
   *         description: Ogłoszenie zostało dodane.
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Advertisement'
   *       500:
   *         description: Bład serwera
   *
   */
  router.get(
    "/api/user/getTutorsForUsers/:userId",
    roleAuth([UserRole.USER]),
    async (request: Request, response: Response, next: NextFunction) => {
      try {
        const result = await businessContainer
          .getUserManager()
          .getTutorsForUsers(request.params.userId);
        response.status(200).send(result);
      } catch (error: any) {
        errorUtils.errorHandler(error, response);
      }
    }
  );
};
