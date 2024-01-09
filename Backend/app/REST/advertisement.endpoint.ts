import { NextFunction, Request, Response, Router } from "express";
import businessContainer from "../business/business.container";
import { errorUtils } from "../service/applicationException";
import auth from "../middleware/auth";

export const advertisementEndpoint = (router: Router) => {
  /**
   * @swagger
   * components:
   *   schemas:
   *     Advertisement:
   *       type: object
   *       required:
   *         - userId
   *         - title
   *         - price
   *         - startDate
   *         - endDate
   *         - category
   *       properties:
   *         _id:
   *            type: string
   *            description: Automatycznie generowanie id dla ogłoszenia
   *         userId:
   *           type: string
   *           description: Id użytkownika który dodaje ogłoszenie
   *         title:
   *           type: string
   *           description: Tytuł ogłoszenia
   *         category:
   *           type: string
   *           description: Kategoria ogłoszenia
   *         description:
   *           type: string
   *           description: Opis ogłoszenia
   *         price:
   *           type: number
   *           description: Cena za godzinę
   *         startDate:
   *           type: date
   *           descripiton:  Data startu obowiązywania ogłoszenia
   *         endDate:
   *           type: date
   *           descripiton:  Data końca obowiązywania ogłoszenia
   *       example:
   *         userId: '345890234cnjbkdfbnih4jnbkj4235'
   *         title: Korepetycje z matematyki
   *         category: SCIENCE
   *         description: Jestem studentem 3 roku ...
   *         price: 20
   *         startDate: 12-12-2023
   *         endDate: 14-12-2023
   */

  /**
   * @swagger
   * tags:
   *   name: Advertisement
   *   description: Moduł API odpowiadający za obsługę ogłoszeń
   * /api/advertisement/add:
   *   post:
   *     summary: Dodanie nowego ogłoszenia
   *     tags: [Advertisement]
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
    "/api/advertisement/add",
    auth,
    async (request: Request, response: Response, next: NextFunction) => {
      try {
        const result = await businessContainer
          .getAdvertisementManager()
          .createNewOrUpdate(request.body);
        response.status(201).send(result);
      } catch (error: any) {
        errorUtils.errorHandler(error, response);
      }
    }
  );

  /**
   * @swagger
   * tags:
   *   name: Advertisement
   *   description: Moduł API odpowiadający za obsługę ogłoszeń
   * /api/advertisement/edit:
   *   put:
   *     summary: Dodanie nowego ogłoszenia
   *     tags: [Advertisement]
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
  router.put(
    "/api/advertisement/edit",
    auth,
    async (request: Request, response: Response, next: NextFunction) => {
      try {
        const result = await businessContainer
          .getAdvertisementManager()
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
   *   name: Advertisement
   *   description: Moduł API odpowiadający za obsługę ogłoszeń
   * /api/advertisement/getAll/{userId}:
   *   get:
   *     summary: Pobranie wszystkich ogłoszeń użtykownika o danym ID
   *     tags: [Advertisement]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/Advertisement'
   *     responses:
   *       200:
   *         description: Zostają zwrócone wszystkie ogłoszenia dla użytkownika.
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Advertisement'
   *       500:
   *         description: Bład serwera
   *
   */
  router.get(
    "/api/advertisement/getAll/:userId",
    auth,
    async (request: Request, response: Response, next: NextFunction) => {
      try {
        const userId = request.params.userId;
        const result = await businessContainer
          .getAdvertisementManager()
          .getAllAdvertisementsByUserId(userId);
        response.status(200).send(result);
      } catch (error: any) {
        errorUtils.errorHandler(error, response);
      }
    }
  );

  /**
   * @swagger
   * tags:
   *   name: Advertisement
   *   description: Moduł API odpowiadający za obsługę ogłoszeń
   * /api/advertisement/get/{advertisementId}:
   *   get:
   *     summary: Pobranie ogłoszenia o danym ID
   *     tags: [Advertisement]
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
    "/api/advertisement/get/:advertisementId",
    async (request: Request, response: Response, next: NextFunction) => {
      try {
        const advertisementId = request.params.advertisementId;
        const result = await businessContainer
          .getAdvertisementManager()
          .getById(advertisementId);
        response.status(200).send(result);
      } catch (error: any) {
        errorUtils.errorHandler(error, response);
      }
    }
  );

  /**
   * @swagger
   * tags:
   *   name: Advertisement
   *   description: Moduł API odpowiadający za obsługę ogłoszeń
   * /api/advertisement/getTutorAdvertisements/{userId}:
   *   get:
   *     summary: Pobranie wszystkich ogłoszeń które są obecnie aktywne dla danego korepetytora
   *     tags: [Advertisement]
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
    "/api/advertisement/getTutorAdvertisements/:userId",
    auth,
    async (request: Request, response: Response, next: NextFunction) => {
      try {
        const userId = request.params.userId;
        const result = await businessContainer
          .getAdvertisementManager()
          .getAllActiveAndNotArchivedAdvertismentsForTutor(userId);
        response.status(200).send(result);
      } catch (error: any) {
        errorUtils.errorHandler(error, response);
      }
    }
  );

  /**
   * @swagger
   * tags:
   *   name: Advertisement
   *   description: Moduł API odpowiadający za obsługę ogłoszeń
   * /api/advertisement/getAll:
   *   get:
   *     summary: Pobranie wszystkich ogłoszeń w systemie
   *     tags: [Advertisement]
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
    "/api/advertisement/getAll",
    async (request: Request, response: Response, next: NextFunction) => {
      try {
        const result = await businessContainer
          .getAdvertisementManager()
          .getAllAdvertisement();
        response.status(200).send(result);
      } catch (error: any) {
        errorUtils.errorHandler(error, response);
      }
    }
  );

  /**
   * @swagger
   * tags:
   *   name: Advertisement
   *   description: Moduł API odpowiadający za obsługę ogłoszeń
   * api/advertisement/remove/{advertisementId}:
   *   delete:
   *     summary: Usunięcie danego ogłoszenia
   *     tags: [Advertisement]
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
    "/api/advertisement/remove/:advertisementId",
    auth,
    async (request: Request, response: Response, next: NextFunction) => {
      try {
        const advertisementId = request.params.advertisementId;
        const result = await businessContainer
          .getAdvertisementManager()
          .removeAdvertisementById(advertisementId);
        response.status(200).send(result);
      } catch (error: any) {
        errorUtils.errorHandler(error, response);
      }
    }
  );
};
