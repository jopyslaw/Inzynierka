import { Router } from "express";
import { userEndpoint } from "./user.endpoint";
import { advertisementEndpoint } from "./advertisement.endpoint";
import { advertisementEventsEndpoint } from "./advertisementEvents.endpoint";
import { reservationEventsEndpoint } from "./reservedEvents.endpoint";
import { utilsEndpoint } from "./utils.endpoint";

export const routes = (router: Router) => {
  userEndpoint(router);
  advertisementEndpoint(router)
  advertisementEventsEndpoint(router),
  reservationEventsEndpoint(router);
  utilsEndpoint(router);
};
