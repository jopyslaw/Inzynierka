import { NextFunction, Request, Response, Router } from "express";
import businessContainer from "../business/business.container";
import { errorUtils } from "../service/applicationException";

export const reservationEventsEndpoint = (router: Router) => {
  router.post(
    "/api/reserve/add",
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

  router.get(
    "/api/reserve/getAll/:userId",
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

  router.get(
    "/api/reserve/get/:advertisementId",
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

  router.delete(
    "/api/reserve/remove/:advertisementId",
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
