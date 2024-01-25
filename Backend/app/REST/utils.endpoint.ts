import { NextFunction, Request, Response, Router } from "express";
import businessContainer from "../business/business.container";
import { errorUtils } from "../service/applicationException";
import auth from "../middleware/auth";

export const utilsEndpoint = (router: Router) => {
  /**
   * @swagger
   * tags:
   *   name: Utils
   *   description: Moduł API odpowiadający za dodatkowe operacja
   * /api/utils/currentDate:
   *   get:
   *     summary: Pobranie aktualnej daty z serwera
   *     tags: [Utils]
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
    "/api/utils/currentDate",
    async (request: Request, response: Response, next: NextFunction) => {
      try {
        let result = await businessContainer.getUtilsManager().getCurrentDate();
        response.status(200).send(result);
      } catch (error: any) {
        errorUtils.errorHandler(error, response);
      }
    }
  );
};
