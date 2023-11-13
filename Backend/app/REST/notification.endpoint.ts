import { NextFunction, Request, Response, Router, request } from "express";
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
    "/api/notification/:userId",
    async (request: Request, response: Response, next: NextFunction) => {
      try {
        let result = await businessContainer
          .getNotificationManager()
          .getNotificationsNotReaded(request.params.userId);
        response.status(200).send(result);
      } catch (error: any) {
        errorUtils.errorHandler(error, response);
      }
    }
  );

  router.post(
    "/api/notification/readed",
    async (request: Request, response: Response, next: NextFunction) => {
      try {
        console.log("Workins");
        const data = request.body.notificationId;
        let result = await businessContainer
          .getNotificationManager()
          .setNotificationToReadedState(data);
        response.status(204).send(result);
      } catch (error: any) {
        errorUtils.errorHandler(error, response);
      }
    }
  );
};
