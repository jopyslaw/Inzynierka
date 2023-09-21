import posterManager from "./poster.manager";
import posterEventsManager from "./posterEvents.manager";
import userManager from "./user.manager";

function getter(manager: any, request?: any) {
  return function (this: any) {
    return manager.operations(request, this);
  };
}

export default {
  getUserManager: getter(userManager),
  getPosterManager: getter(posterManager),
  getPosterEventsManager: getter(posterEventsManager),
};
