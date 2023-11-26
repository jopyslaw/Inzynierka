import { NextFunction, Request, Response, Router } from "express";
import businessContainer from "../business/business.container";
import { errorUtils } from "../service/applicationException";
import auth from "../middleware/auth";

export const advertisementEventsEndpoint = (router: Router) => {
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

  router.get(
    "/api/advertisementEvents/get/:advertisementId",
    auth,
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
