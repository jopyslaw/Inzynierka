import { Router } from "express";
import { userEndpoint } from "./user.endpoint";
import { posterEndpoint } from "./poster.endpoint";

export const routes = (router: Router) => {
  userEndpoint(router);
  posterEndpoint(router);
};
