import { NextFunction, Request, Response, Router, request } from "express";
import businessContainer from "../business/business.container";
import { errorUtils } from "../service/applicationException";

export const messageEndpoint = (router: Router) => {
  router.get(
    "/api/message/counter/:userId",
    async (request: Request, response: Response, next: NextFunction) => {
      try {
        const result = await businessContainer
          .getMessageManager()
          .getNotReadedMessage(request.params.userId);
        response.status(200).send(result);
      } catch (error: any) {
        errorUtils.errorHandler(error, response);
      }
    }
  );

  router.get(
    "/api/message/contacts/:userId",
    async (request: Request, response: Response, next: NextFunction) => {
      try {
        const result = await businessContainer
          .getMessageManager()
          .getAllUserContacts(request.params.userId);
        response.status(200).send(result);
      } catch (error: any) {
        errorUtils.errorHandler(error, response);
      }
    }
  );

  router.post(
    "/api/message/send",
    async (request: Request, response: Response, next: NextFunction) => {
      try {
        const result = await businessContainer
          .getMessageManager()
          .createNewOrUpdate(request.body);
        response.status(200).send(result);
      } catch (error: any) {
        errorUtils.errorHandler(error, response);
      }
    }
  );
};
