import { Context } from "vm";
import advertisementDAO from "../DAO/advertisementDAO";
import advertisementEventDAO from "../DAO/advertisementEventDAO";
import { AdvertisementDAO } from "../shared/models/advertisementDAO.model";
import moment from "moment";
import { NotificationDAO } from "../shared/models/notificationDAO.model";
import { NotificationTypeEnum } from "../shared/enums/notificationType.enum";
import businessContainer from "./business.container";

const operations = (context: Context) => {
  const createNewOrUpdate = async (advertisement: AdvertisementDAO) => {
    const { events, deletedEventsIds, ...preparedData } = advertisement;

    console.log(events);
    console.log(preparedData);
    console.log("advertisement", advertisement);

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
        console.log("deleted events ids", deletedEventsIds);
        const data = await advertisementEventDAO.removeByIds(
          advertisement.deletedEventsIds
        );
        console.log(data);
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
    if (advertisement) {
      return advertisement;
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
    const advertisement = await advertisementDAO.removeById(advertisementId);
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
