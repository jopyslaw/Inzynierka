import { NextFunction, Request, Response, Router } from "express";
import businessContainer from "../business/business.container";
import { errorUtils } from "../service/applicationException";

export const posterEndpoint = (router: Router) => {
  router.post(
    "/api/poster/add",
    async (request: Request, response: Response, next: NextFunction) => {
      try {
        const result = await businessContainer
          .getPosterManager()
          .createNewOrUpdate(request.body);
        response.status(200).send(result);
      } catch (error: any) {
        errorUtils.errorHandler(error, response);
      }
    }
  );

  router.get(
    "/api/poster/getAll/:userId",
    async (request: Request, response: Response, next: NextFunction) => {
      try {
        const userId = request.params.userId;
        const result = await businessContainer
          .getPosterManager()
          .getAllPostersByUserId(userId);
        response.status(200).send(result);
      } catch (error: any) {
        errorUtils.errorHandler(error, response);
      }
    }
  );

  router.get(
    "/api/poster/get/:posterId",
    async (request: Request, response: Response, next: NextFunction) => {
      try {
        const posterId = request.params.posterId;
        const result = await businessContainer
          .getPosterManager()
          .getPosterById(posterId);
        response.status(200).send(result);
      } catch (error: any) {
        errorUtils.errorHandler(error, response);
      }
    }
  );

  router.delete(
    "api/poster/remove/:posterId",
    async (request: Request, response: Response, next: NextFunction) => {
      try {
        const posterId = request.params.posterId;
        const result = await businessContainer
          .getPosterManager()
          .removeById(posterId);
        response.status(200).send(result);
      } catch (error: any) {
        errorUtils.errorHandler(error, response);
      }
    }
  );
};
