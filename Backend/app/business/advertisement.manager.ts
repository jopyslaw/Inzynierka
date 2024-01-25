import { Context } from "vm";
import advertisementDAO from "../DAO/advertisementDAO";
import advertisementEventDAO from "../DAO/advertisementEventDAO";
import { AdvertisementDAO } from "../shared/models/advertisementDAO.model";
import moment from "moment";
import { NotificationDAO } from "../shared/models/notificationDAO.model";
import { NotificationTypeEnum } from "../shared/enums/notificationType.enum";
import businessContainer from "./business.container";
import userDAO from "../DAO/userDAO";
import reservedEventDAO from "../DAO/reservedEventDAO";
import notificationsDAO from "../DAO/notificationsDAO";

const operations = (context: Context) => {
  const createNewOrUpdate = async (advertisement: AdvertisementDAO) => {
    const { events, deletedEventsIds, ...preparedData } = advertisement;

    const updatedPreparedData = {
      ...preparedData,
      isActive:
        moment().format("YYYY-MM-DD") ===
        moment(preparedData.startDate).format("YYYY-MM-DD")
          ? true
          : false,
    };

    const advertisementData = await advertisementDAO.createNewOrUpdate(
      updatedPreparedData
    );

    if (advertisementData) {
      const data = events?.map((event: any) => {
        return {
          ...event,
          advertisementId: advertisementData.id,
          userId: advertisementData.userId,
        };
      });

      if (advertisement.id && deletedEventsIds?.length !== 0) {
        const data = await advertisementEventDAO.removeByIds(
          advertisement.deletedEventsIds
        );
      }

      await advertisementEventDAO.createNewOrUpdate(data as any);

      let notificationData: NotificationDAO;

      if (advertisement.id) {
        notificationData = {
          userId: advertisementData.userId,
          advertisementId: advertisement.id,
          title: "Ogłoszenie zostało edytowane",
          content: "Ogłoszenie zostało edytowane",
          isReaded: false,
          dateTimeSend: moment().toISOString(),
          typeOfNotification: NotificationTypeEnum.ADVERTISMENTS,
        };
      } else {
        notificationData = {
          userId: advertisementData.userId,
          advertisementId: advertisementData.id,
          title: "Ogłoszenie zostało dodane",
          content: "Ogłoszenie zostało dodane",
          isReaded: false,
          dateTimeSend: moment().toISOString(),
          typeOfNotification: NotificationTypeEnum.ADVERTISMENTS,
        };
      }

      await businessContainer
        .getNotificationManager()
        .createNewOrUpdate(notificationData);

      return advertisementData;
    }
  };

  const getById = async (id: string) => {
    const advertisement = await advertisementDAO.getById(id);

    const tutor = await userDAO.get(advertisement.userId);

    const preparedData = {
      ...advertisement,
      tutor: tutor.login,
    };

    if (preparedData) {
      return preparedData;
    }
  };

  const getAllAdvertisementsByUserId = async (userId: string) => {
    const advertisements = await advertisementDAO.getAllUserAdvertisement(
      userId
    );
    if (advertisements) {
      return advertisements;
    }
  };

  const getAllAdvertisement = async () => {
    const advertisements = await advertisementDAO.getAllAdvertisements();
    if (advertisements) {
      return advertisements;
    }
  };

  const removeAdvertisementById = async (advertisementId: string) => {
    const advertisementsEvents =
      await advertisementEventDAO.getAdvertisementEventById(advertisementId);

    const advertisementEventsIds = advertisementsEvents.map(
      (advertisementsEvent) => advertisementsEvent._id.toString()
    );

    const reservedAdvertismenets =
      await reservedEventDAO.getAllReservationForAdvertisementId(
        advertisementEventsIds
      );

    const reservedAdvertismenetsIds = reservedAdvertismenets?.map((event) =>
      event._id.toString()
    );

    const deleteReserverdAdvertisementsEvents =
      await reservedEventDAO.removeEventsByIds(reservedAdvertismenetsIds);

    const deleteAdvertisementsEvents = await advertisementEventDAO.removeByIds(
      advertisementEventsIds
    );

    const advertisement = await advertisementDAO.removeById(advertisementId);

    let notificationDataForTutor: NotificationDAO;

    notificationDataForTutor = {
      userId: advertisement?.userId ?? "",
      advertisementId: advertisementId,
      title: "Ogłoszenie zostało usunięte",
      content: "Ogłoszenie zostało usunięte",
      isReaded: false,
      dateTimeSend: moment().toISOString(),
      typeOfNotification: NotificationTypeEnum.ADVERTISMENTS,
    };

    let notificationDataForUsers: NotificationDAO[] | undefined;

    notificationDataForUsers = reservedAdvertismenets?.map((reserved) => ({
      userId: reserved.userId,
      advertisementId: advertisementId,
      title: "Rezerwacja została usunięta ponieważ ogłoszenie zostało usunięte",
      content:
        "Rezerwacja została usunięta ponieważ ogłoszenie zostało usunięte",
      isReaded: false,
      dateTimeSend: moment().toISOString(),
      typeOfNotification: NotificationTypeEnum.ADVERTISMENTS,
    }));

    await notificationsDAO.createNewOrUpdate(notificationDataForTutor);
    if (notificationDataForUsers) {
      await notificationsDAO.createMany(notificationDataForUsers);
    }

    if (advertisement) {
      return advertisement;
    }
  };

  const getAllInActiveAndNotArchivedAdvertisments = async () => {
    const advertisements =
      await advertisementDAO.getAllInActiveAndNotArchivedAdvertisments();
    if (advertisements) {
      return advertisements;
    }
  };

  const activateAdvertisments = async (advertismentIds: string[]) => {
    const advertisement = await advertisementDAO.activateAdvertisments(
      advertismentIds
    );
    if (advertisement) {
      return advertisement;
    }
  };

  const deactivateAdvertisments = async (advertismentIds: string[]) => {
    const advertisement = await advertisementDAO.deactivateAdvertisments(
      advertismentIds
    );
    if (advertisement) {
      return advertisement;
    }
  };

  const getAllActiveAndNotArchivedAdvertismentsForTutor = async (
    userId: string
  ) => {
    const advertisement =
      await advertisementDAO.getAllActiveAndNotArchivedAdvertismentsForTutor(
        userId
      );
    if (advertisement) {
      return advertisement;
    }
  };

  return {
    createNewOrUpdate,
    getAllAdvertisementsByUserId,
    getById,
    removeAdvertisementById,
    getAllAdvertisement,
    getAllInActiveAndNotArchivedAdvertisments,
    activateAdvertisments,
    deactivateAdvertisments,
    getAllActiveAndNotArchivedAdvertismentsForTutor,
  };
};

export default {
  operations,
};
