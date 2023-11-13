import advertisementManager from "./advertisement.manager";
import advertisementEventsManager from "./advertisementEvents.manager";
import messageManager from "./message.manager";
import notificationManager from "./notification.manager";
import reservedEventsManager from "./reservedEvents.manager";
import userManager from "./user.manager";
import utilsManager from "./utils.manager";

function getter(manager: any, request?: any) {
  return function (this: any) {
    return manager.operations(request, this);
  };
}

export default {
  getUserManager: getter(userManager),
  getAdvertisementManager: getter(advertisementManager),
  getAdvertisementEventsManager: getter(advertisementEventsManager),
  getReservedEventsManager: getter(reservedEventsManager),
  getUtilsManager: getter(utilsManager),
  getNotificationManager: getter(notificationManager),
  getMessageManager: getter(messageManager),
};
