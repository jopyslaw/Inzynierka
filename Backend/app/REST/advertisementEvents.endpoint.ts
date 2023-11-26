import { NextFunction, Request, Response, Router } from "express";
import businessContainer from "../business/business.container";
import { errorUtils } from "../service/applicationException";

export const advertisementEventsEndpoint = (router: Router) => {
  router.get(
    "/api/advertisementEvents/getAll/:userId",
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

  router.get(
    "/api/advertisementEvents/reservedUserEvents/:userId",
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

  router.delete(
    "api/advertisementEvents/remove/:advertisementEventId",
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
