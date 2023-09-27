import { NextFunction, Request, Response, Router } from "express";
import businessContainer from "../business/business.container";
import { errorUtils } from "../service/applicationException";

export const reservationEventsEndpoint = (router: Router) => {
  router.post(
    "/api/reserve/add",
    async (request: Request, response: Response, next: NextFunction) => {
      try {
        console.log(request.body);
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
          .getAllPostersByUserId(userId);
        response.status(200).send(result);
      } catch (error: any) {
        errorUtils.errorHandler(error, response);
      }
    }
  );

  router.get(
    "/api/reserve/get/:posterId",
    async (request: Request, response: Response, next: NextFunction) => {
      try {
        const posterId = request.params.posterId;
        const result = await businessContainer
          .getReservedEventsManager()
          .getPosterById(posterId);
        response.status(200).send(result);
      } catch (error: any) {
        errorUtils.errorHandler(error, response);
      }
    }
  );

  router.delete(
    "/api/reserve/remove/:posterId",
    async (request: Request, response: Response, next: NextFunction) => {
      try {
        console.log("delete");
        const posterId = request.params.posterId;
        const result = await businessContainer
          .getReservedEventsManager()
          .removeById(posterId);
        response.status(200).send(result);
      } catch (error: any) {
        errorUtils.errorHandler(error, response);
      }
    }
  );
};