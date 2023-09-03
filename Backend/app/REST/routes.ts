import { Router } from "express";
import { userEndpoint } from "./user.endpoint";

export const routes = (router: Router) => {
  userEndpoint(router);
};
