import { NextFunction, Request, Response, Router } from "express";
import businessContainer from "../business/business.container";
import { errorUtils } from "../service/applicationException";
import auth from "../middleware/auth";

export const advertisementEventsEndpoint = (router: Router) => {
  /**
   * @swagger
   * tags:
   *   name: AdvertisementEvents
   *   description: Moduł API odpowiadający za obsługę wydarzeń dla ogłoszenia
   * /api/advertisementEvents/getAll/{userId}:
   *   get:
   *     summary: Pobiera wszystkie wydarzenia dla danego użytkownika
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
    "/api/advertisementEvents/getAll/:userId",
    auth,
    async (request: Request, response: Response, next: NextFunction) => {
      try {
        const userId = request.params.userId;
        const result = await businessContainer
          .getAdvertisementEventsManager()
          .getAllAdvertisementEventsByUserId(userId);
        response.status(200).send(result);
      } catch (error: any) {
        errorUtils.errorHandler(error, response);
      }
    }
  );

  /**
   * @swagger
   * tags:
   *   name: AdvertisementEvents
   *   description: Moduł API odpowiadający za obsługę wydarzeń dla ogłoszenia
   * /api/advertisementEvents/get/{advertisementId}:
   *   get:
   *     summary: Pobiera wydarzenia dla danego ogłoszenia
   *     tags: [AdvertisementEvents]
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
    "/api/advertisementEvents/get/:advertisementId",
    async (request: Request, response: Response, next: NextFunction) => {
      try {
        const advertisementId = request.params.advertisementId;
        const result = await businessContainer
          .getAdvertisementEventsManager()
          .getAdvertisementEventsById(advertisementId);
        response.status(200).send(result);
      } catch (error: any) {
        errorUtils.errorHandler(error, response);
      }
    }
  );

  /**
   * @swagger
   * tags:
   *   name: AdvertisementEvents
   *   description: Moduł API odpowiadający za obsługę wydarzeń dla ogłoszenia
   * /api/advertisementEvents/reservedUserEvents/{userId}:
   *   get:
   *     summary: Pobiera wszystkie wydarzenia na które zapisany jest użytkownik
   *     tags: [AdvertisementEvents]
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
    "/api/advertisementEvents/reservedUserEvents/:userId",
    auth,
    async (request: Request, response: Response, next: NextFunction) => {
      try {
        const userId = request.params.userId;
        const result = await businessContainer
          .getAdvertisementEventsManager()
          .getAllReseveredEventsForUser(userId);
        response.status(200).send(result);
      } catch (error: any) {
        errorUtils.errorHandler(error, response);
      }
    }
  );

  /**
   * @swagger
   * tags:
   *   name: AdvertisementEvents
   *   description: Moduł API odpowiadający za obsługę wydarzeń dla ogłoszenia
   * api/advertisementEvents/remove/{advertisementEventId}:
   *   delete:
   *     summary: Usunięcie danego wydarzenia
   *     tags: [AdvertisementEvents]
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
    "api/advertisementEvents/remove/:advertisementEventId",
    auth,
    async (request: Request, response: Response, next: NextFunction) => {
      try {
        const advertisementId = request.params.advertisementEventId;
        const result = await businessContainer
          .getAdvertisementEventsManager()
          .removeById(advertisementId);
        response.status(200).send(result);
      } catch (error: any) {
        errorUtils.errorHandler(error, response);
      }
    }
  );
};
