import { NextFunction, Request, Response, Router } from "express";
import businessContainer from "../business/business.container";
import { errorUtils } from "../service/applicationException";
import auth from "../middleware/auth";

export const advertisementEndpoint = (router: Router) => {
  router.post(
    "/api/advertisement/add",
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

  router.get(
    "/api/advertisement/get/:advertisementId",
    auth,
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

  router.delete(
    "api/advertisement/remove/:advertisementId",
    auth,
    async (request: Request, response: Response, next: NextFunction) => {
      try {
        const advertisementId = request.params.advertisementId;
        const result = await businessContainer
          .getAdvertisementManager()
          .removeById(advertisementId);
        response.status(200).send(result);
      } catch (error: any) {
        errorUtils.errorHandler(error, response);
      }
    }
  );
};
