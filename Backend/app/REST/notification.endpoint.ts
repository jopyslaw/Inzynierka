import { NextFunction, Request, Response, Router } from "express";
import businessContainer from "../business/business.container";
import { errorUtils } from "../service/applicationException";

export const notificationEndpoint = (router: Router) => {
  router.get(
    "/api/notification/counter/:userId",
    async (request: Request, response: Response, next: NextFunction) => {
      try {
        let result = await businessContainer
          .getNotificationManager()
          .getNotReadedNotifications(request.params.userId);
        response.status(200).send(result);
      } catch (error: any) {
        errorUtils.errorHandler(error, response);
      }
    }
  );

  router.get(
    "/api/notification",
    async (request: Request, response: Response, next: NextFunction) => {
      try {
        let result = await businessContainer
          .getNotificationManager()
          .getNotifications(request.params.userId);
        response.status(200).send(result);
      } catch (error: any) {
        errorUtils.errorHandler(error, response);
      }
    }
  );
};
