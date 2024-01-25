import { NextFunction, Request, Response, Router } from "express";
import businessContainer from "../business/business.container";
import { errorUtils } from "../service/applicationException";
import auth from "../middleware/auth";

export const reservationEventsEndpoint = (router: Router) => {
  /**
   * @swagger
   * tags:
   *   name: ReservationEvents
   *   description: Moduł API odpowiadający za zapis na korepetycje
   * /api/reserve/add:
   *   post:
   *     summary: Zapis na korepetycje
   *     tags: [ReservationEvents]
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
    "/api/reserve/add",
    auth,
    async (request: Request, response: Response, next: NextFunction) => {
      try {
        const result = await businessContainer
          .getReservedEventsManager()
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
   *   name: ReservationEvents
   *   description: Moduł API odpowiadający za zapis na korepetycje
   * /api/reserve/getAll/{userId}:
   *   get:
   *     summary: Pobiera wszystkie wizyty na które zapisany jest dany użytkownik
   *     tags: [ReservationEvents]
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
    "/api/reserve/getAll/:userId",
    auth,
    async (request: Request, response: Response, next: NextFunction) => {
      try {
        const userId = request.params.userId;
        const result = await businessContainer
          .getReservedEventsManager()
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
   *   name: ReservationEvents
   *   description: Moduł API odpowiadający za zapis na korepetycje
   * /api/reserve/get/{advertisementId}:
   *   get:
   *     summary: Pobiera wszystkie rezerwacje dla danego ogłoszenia
   *     tags: [ReservationEvents]
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
    "/api/reserve/get/:advertisementId",
    auth,
    async (request: Request, response: Response, next: NextFunction) => {
      try {
        const advertisementId = request.params.advertisementId;
        const result = await businessContainer
          .getReservedEventsManager()
          .getAdvertisementById(advertisementId);
        response.status(200).send(result);
      } catch (error: any) {
        errorUtils.errorHandler(error, response);
      }
    }
  );

  /**
   * @swagger
   * tags:
   *   name: ReservationEvents
   *   description: Moduł API odpowiadający za zapis na korepetycje
   * /api/reserve/remove/{advertisementId}:
   *   delete:
   *     summary: Usunięcie rezerwacji
   *     tags: [ReservationEvents]
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
    "/api/reserve/remove/:advertisementId",
    auth,
    async (request: Request, response: Response, next: NextFunction) => {
      try {
        const advertisementId = request.params.advertisementId;
        const result = await businessContainer
          .getReservedEventsManager()
          .removeById(advertisementId);
        response.status(200).send(result);
      } catch (error: any) {
        errorUtils.errorHandler(error, response);
      }
    }
  );
};
