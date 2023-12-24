import { NextFunction, Request, Response, Router, request } from "express";
import businessContainer from "../business/business.container";
import { errorUtils } from "../service/applicationException";
import auth from "../middleware/auth";

export const messageEndpoint = (router: Router) => {
  /**
   * @swagger
   * tags:
   *   name: Message
   *   description: Moduł API odpowiadający za wiadomości
   * /api/message/counter/{userId}:
   *   get:
   *     summary: Pobiera liczbę nie przeczytanych wiadomości dla danego użytkownika
   *     tags: [Message]
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
    "/api/message/counter/:userId",
    auth,
    async (request: Request, response: Response, next: NextFunction) => {
      try {
        const result = await businessContainer
          .getMessageManager()
          .getNotReadedMessage(request.params.userId);
        response.status(200).send(result);
      } catch (error: any) {
        errorUtils.errorHandler(error, response);
      }
    }
  );

  /**
   * @swagger
   * tags:
   *   name: Message
   *   description: Moduł API odpowiadający za wiadomości
   * /api/message/contacts/{userId}:
   *   get:
   *     summary: Pobiera wszystkie kontakty dla danego użytkownika
   *     tags: [Message]
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
    "/api/message/contacts/:userId",
    auth,
    async (request: Request, response: Response, next: NextFunction) => {
      try {
        const result = await businessContainer
          .getMessageManager()
          .getAllUserContacts(request.params.userId);
        response.status(200).send(result);
      } catch (error: any) {
        errorUtils.errorHandler(error, response);
      }
    }
  );

  /**
   * @swagger
   * tags:
   *   name: Message
   *   description: Moduł API odpowiadający za wiadomości
   * /api/message/send:
   *   post:
   *     summary: Utworzenie nowej wiadomości
   *     tags: [Message]
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
    "/api/message/send",
    auth,
    async (request: Request, response: Response, next: NextFunction) => {
      try {
        const result = await businessContainer
          .getMessageManager()
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
   *   name: Message
   *   description: Moduł API odpowiadający za wiadomości
   * /api/message/messages/:senderId/:reciverId:
   *   get:
   *     summary: Pobiera wiadomosci dla danego nadawcy i odbiorcy
   *     tags: [Message]
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
    "/api/message/messages/:senderId/:reciverId",
    auth,
    async (request: Request, response: Response, next: NextFunction) => {
      try {
        const result = await businessContainer
          .getMessageManager()
          .getAllMessages(request.params.senderId, request.params.reciverId);
        response.status(200).send(result);
      } catch (error: any) {
        errorUtils.errorHandler(error, response);
      }
    }
  );

  /**
   * @swagger
   * tags:
   *   name: Message
   *   description: Moduł API odpowiadający za wiadomości
   * /api/message/readed:
   *   get:
   *     summary: Zapisuje ,że dana wiadomość jest przeczytana
   *     tags: [Message]
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
    "/api/message/readed",
    auth,
    async (request: Request, response: Response, next: NextFunction) => {
      try {
        const result = await businessContainer
          .getMessageManager()
          .setStateToReaded(request.body);
        response.status(200).send(result);
      } catch (error: any) {
        errorUtils.errorHandler(error, response);
      }
    }
  );
};
