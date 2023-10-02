import { NextFunction, Request, Response, Router } from "express";
import businessContainer from "../business/business.container";
import { errorUtils } from "../service/applicationException";

export const utilsEndpoint = (router: Router) => {
  router.get(
    "/api/utils/currentDate",
    async (request: Request, response: Response, next: NextFunction) => {
      try {
        let result = await businessContainer.getUtilsManager().getCurrentDate();
        response.status(200).send(result);
      } catch (error: any) {
        errorUtils.errorHandler(error, response);
      }
    }
  );
};
