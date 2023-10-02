import { Router } from "express";
import { userEndpoint } from "./user.endpoint";
import { posterEndpoint } from "./poster.endpoint";
import { posterEventsEndpoint } from "./posterEvents.endpoint";
import { reservationEventsEndpoint } from "./reservedEvents.endpoint";
import { utilsEndpoint } from "./utils.endpoint";

export const routes = (router: Router) => {
  userEndpoint(router);
  posterEndpoint(router);
  posterEventsEndpoint(router);
  reservationEventsEndpoint(router);
  utilsEndpoint(router);
};
