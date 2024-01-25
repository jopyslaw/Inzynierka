import moment from "moment";
import businessContainer from "../business/business.container";
import { AdvertisementDAO } from "../shared/models/advertisementDAO.model";
import { NotificationTypeEnum } from "../shared/enums/notificationType.enum";

export const activateAdvertismentsIfStartDateIsToday = async () => {
  const advertisments = await businessContainer
    .getAdvertisementManager()
    .getAllInActiveAndNotArchivedAdvertisments();

  const currentDate = moment().format("YYYY-MM-DD");

  const advertismentsToActivate = advertisments.filter(
    (advertisment: AdvertisementDAO) => {
      const advertismentStartDate = moment(advertisment.startDate).format(
        "YYYY-MM-DD"
      );
      if (currentDate === advertismentStartDate) {
        return true;
      }
      return false;
    }
  );

  const notificationToSave = advertismentsToActivate.map(
    (advertisement: any) => ({
      userId: advertisement.userId,
      title: "Ogłoszenie aktywowane",
      content: "Zostało aktywowane ogłoszenie",
      isReaded: false,
      dateTimeSend: moment().toISOString(),
      typeOfNotification: NotificationTypeEnum.ADVERTISMENTS,
      advertisementId: advertisement._id.toString(),
    })
  );

  await businessContainer
    .getNotificationManager()
    .createMany(notificationToSave);

  const advertismentsIds = advertismentsToActivate.map(
    (advertisment: AdvertisementDAO) => advertisment.id
  );

  await businessContainer
    .getAdvertisementManager()
    .activateAdvertisments(advertismentsIds);
  await deActivateAdvertismentsIfEndDateIsNotToday();
};

export const deActivateAdvertismentsIfEndDateIsNotToday = async () => {
  const advertisments = await businessContainer
    .getAdvertisementManager()
    .getAllInActiveAndNotArchivedAdvertisments();

  const currentDate = moment().subtract(1, "days").format("YYYY-MM-DD");

  const advertismentsToDeactivate = advertisments.filter(
    (advertisment: AdvertisementDAO) => {
      const advertismentEndDate = moment(advertisment.endDate).format(
        "YYYY-MM-DD"
      );
      if (currentDate === advertismentEndDate) {
        return true;
      }
      return false;
    }
  );

  const notificationToSave = advertismentsToDeactivate.map(
    (advertisement: any) => ({
      userId: advertisement.userId,
      title: "Ogłoszenie dezaktywowano",
      content: "Zostało dezaktywowane ogłoszenie",
      isReaded: false,
      dateTimeSend: moment().toISOString(),
      typeOfNotification: NotificationTypeEnum.ADVERTISMENTS,
      advertisementId: advertisement._id.toString(),
    })
  );

  await businessContainer
    .getNotificationManager()
    .createMany(notificationToSave);

  const advertismentsIds = advertismentsToDeactivate.map(
    (advertisment: AdvertisementDAO) => advertisment.id
  );

  await businessContainer
    .getAdvertisementManager()
    .deactivateAdvertisments(advertismentsIds);
};
