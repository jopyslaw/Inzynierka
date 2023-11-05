import { NextFunction, Request, Response, Router } from "express";
import businessContainer from "../business/business.container";
import {
  ApplicationException,
  errorUtils,
} from "../service/applicationException";

export const userEndpoint = (router: Router) => {
  router.post(
    "/api/user/auth",
    async (request: Request, response: Response, next: NextFunction) => {
      try {
        let result = await businessContainer
          .getUserManager()
          .authenticate(request.body.login, request.body.password);
        response.status(200).send(result);
      } catch (error: any) {
        errorUtils.errorHandler(error, response);
      }
    }
  );

  router.post(
    "/api/user/create",
    async (request: Request, response: Response, next: NextFunction) => {
      try {
        const result = await businessContainer
          .getUserManager()
          .createNewOrUpdate(request.body);
        response.status(200).send(result);
      } catch (error: any) {
        errorUtils.errorHandler(error, response);
      }
    }
  );

  router.delete(
    "/api/user/logout/:userId",
    //auth,
    async (request: Request, response: Response, next: NextFunction) => {
      try {
        let result = await businessContainer
          .getUserManager()
          .removeHashSession(request.body.userId);
        response.status(200).send(result);
      } catch (error: any) {
        errorUtils.errorHandler(error, response);
      }
    }
  );

  router.get(
    "/api/user/data/:userId", //auth,
    async (request: Request, response: Response, next: NextFunction) => {
      try {
        const userId = request.params.userId;
        const result = await businessContainer
          .getUserManager()
          .getAccountInfo(userId);
        response.status(200).send(result);
      } catch (error: any) {
        errorUtils.errorHandler(error, response);
      }
    }
  );

  router.post(
    "/api/user/password/:userId", //auth
    async (request: Request, response: Response, next: NextFunction) => {
      try {
        console.log(request.body);
        const userId = request.params.userId;
        const data = request.body.password;
        const result = await businessContainer
          .getUserManager()
          .updatePassword(userId, data);
        response.status(200).send(result);
      } catch (error: any) {
        errorUtils.errorHandler(error, response);
      }
    }
  );

  router.get(
    "/api/user/getAllTutors",
    async (request: Request, response: Response, next: NextFunction) => {
      try {
        const result = await businessContainer.getUserManager().getAllTutors();
        response.status(200).send(result);
      } catch (error: any) {
        errorUtils.errorHandler(error, response);
      }
    }
  );
};
