import { NextFunction, Request, Response, Router, request } from "express";
import businessContainer from "../business/business.container";
import { errorUtils } from "../service/applicationException";
import auth from "../middleware/auth";

export const notificationEndpoint = (router: Router) => {
  /**
   * @swagger
   * tags:
   *   name: Notification
   *   description: Moduł API odpowiadający za powiadomienia
   * /api/notification/counter/{userId}:
   *   get:
   *     summary: Pobiera liczbę nie odczytanych powiadomień dla danego użytkownika
   *     tags: [Notification]
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
    "/api/notification/counter/:userId",
    auth,
    async (request: Request, response: Response, next: NextFunction) => {
      try {
        let result = await businessContainer
          .getNotificationManager()
          .getNotReadedNotifications(request.params.userId);
        response.status(200).send(result);
      } catch (error: any) {
        errorUtils.errorHandler(error, response);
      }
    }
  );

  /**
   * @swagger
   * tags:
   *   name: Notification
   *   description: Moduł API odpowiadający za powiadomienia
   * /api/notification/{userId}:
   *   get:
   *     summary: Pobiera powiadomienia dla użytkownika
   *     tags: [Notification]
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
    "/api/notification/:userId",
    auth,
    async (request: Request, response: Response, next: NextFunction) => {
      try {
        let result = await businessContainer
          .getNotificationManager()
          .getNotificationsNotReaded(request.params.userId);
        response.status(200).send(result);
      } catch (error: any) {
        errorUtils.errorHandler(error, response);
      }
    }
  );

  /**
   * @swagger
   * tags:
   *   name: Notification
   *   description: Moduł API odpowiadający za powiadomienia
   * /api/notification/{userId}:
   *   post:
   *     summary: Zmiana stanu powiadomienia na przeczytane
   *     tags: [Notification]
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
    "/api/notification/readed",
    auth,
    async (request: Request, response: Response, next: NextFunction) => {
      try {
        const data = request.body.notificationId;
        let result = await businessContainer
          .getNotificationManager()
          .setNotificationToReadedState(data);
        response.status(204).send(result);
      } catch (error: any) {
        errorUtils.errorHandler(error, response);
      }
    }
  );
};
