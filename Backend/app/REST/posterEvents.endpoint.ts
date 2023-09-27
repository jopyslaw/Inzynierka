import { NextFunction, Request, Response, Router } from "express";
import businessContainer from "../business/business.container";
import { errorUtils } from "../service/applicationException";

export const posterEventsEndpoint = (router: Router) => {
  router.get(
    "/api/posterEvents/getAll/:userId",
    async (request: Request, response: Response, next: NextFunction) => {
      try {
        const userId = request.params.userId;
        const result = await businessContainer
          .getPosterEventsManager()
          .getAllPostersEventsByUserId(userId);
        response.status(200).send(result);
      } catch (error: any) {
        errorUtils.errorHandler(error, response);
      }
    }
  );

  router.get(
    "/api/posterEvents/get/:posterId",
    async (request: Request, response: Response, next: NextFunction) => {
      try {
        console.log("working");
        const posterId = request.params.posterId;
        const result = await businessContainer
          .getPosterEventsManager()
          .getPosterEventsById(posterId);
        response.status(200).send(result);
      } catch (error: any) {
        errorUtils.errorHandler(error, response);
      }
    }
  );

  router.get(
    "/api/posterEvents/reservedUserEvents/:userId",
    async (request: Request, response: Response, next: NextFunction) => {
      try {
        console.log("asdsadada");
        const userId = request.params.userId;
        const result = await businessContainer
          .getPosterEventsManager()
          .getAllReseveredEventsForUser(userId);
        response.status(200).send(result);
      } catch (error: any) {
        errorUtils.errorHandler(error, response);
      }
    }
  );

  router.delete(
    "api/posterEvents/remove/:posterEventId",
    async (request: Request, response: Response, next: NextFunction) => {
      try {
        const posterId = request.params.posterEventId;
        const result = await businessContainer
          .getPosterEventsManager()
          .removeById(posterId);
        response.status(200).send(result);
      } catch (error: any) {
        errorUtils.errorHandler(error, response);
      }
    }
  );
};
