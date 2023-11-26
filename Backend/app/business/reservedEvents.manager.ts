import { Context } from "vm";
import advertisementDAO from "../DAO/advertisementDAO";
import reservedEventDAO from "../DAO/reservedEventDAO";
import { AdvertisementDAO } from "../shared/models/advertisementDAO.model";
import { ReservedAdvertisementEventDAO } from "../shared/models/reservedAdvertisementEventDAO.model";
import notificationsDAO from "../DAO/notificationsDAO";
import { NotificationDAO } from "../shared/models/notificationDAO.model";
import moment from "moment";
import { NotificationTypeEnum } from "../shared/enums/notificationType.enum";
import businessContainer from "./business.container";
import advertisementEventDAO from "../DAO/advertisementEventDAO";

const operations = (context: Context) => {
  const createNewOrUpdate = async (
    reservedData: ReservedAdvertisementEventDAO
  ) => {
    const reserved = await reservedEventDAO.createNewOrUpdate(reservedData);
    console.log(reserved);
    if (reserved) {
      const dataForTutor: NotificationDAO = {
        userId: reservedData.tutorId,
        title: "Zapis na korepetycje",
        content: "Uzytkownik zapisał sie do ciebie na korepetycje",
        isReaded: false,
        dateTimeSend: moment().toISOString(),
        typeOfNotification: NotificationTypeEnum.ADVERTISMENTS,
        advertisementId: reservedData.advertisementId,
      };

      const dataForUser: NotificationDAO = {
        userId: reservedData.userId,
        title: "Zapis na korepetycje",
        content: "Zapis na wybrane korepetycje się powiódł",
        isReaded: false,
        dateTimeSend: moment().toISOString(),
        typeOfNotification: NotificationTypeEnum.ADVERTISMENTS,
        advertisementId: reservedData.advertisementId,
      };

      const resultForTutor = await businessContainer
        .getNotificationManager()
        .createNewOrUpdate(dataForTutor);
      const resultForUser = await businessContainer
        .getNotificationManager()
        .createNewOrUpdate(dataForUser);
      return reserved;
    }
  };

  const getReservationById = async (id: string) => {
    const reservation = await reservedEventDAO.getReservationById(id);
    if (reservation) {
      return reservation;
    }
  };

  const getAllReservationForTutor = async (userId: string) => {
    const advertisements = await reservedEventDAO.getAllReservationForTutor(
      userId
    );
    if (advertisements) {
      return advertisements;
    }
  };

  const removeById = async (advertisementId: string) => {
    const reserved = await reservedEventDAO.getReservationById(advertisementId);
    console.log("reserved", reserved);

    const event = await advertisementEventDAO.findById(
      reserved.advertisementEventId
    );
    console.log(event);
    console.log("evemt", event);
    if (event) {
      console.log("evemt", event);

      const advertisementData = await advertisementDAO.getById(
        event.advertisementId
      );

      console.log(advertisementData);
      const dataForTutor: NotificationDAO = {
        userId: advertisementData.userId,
        title: "Rezygnacja z korepetycji",
        content: "Uzytkownik zrezygnował z wizyty na korepetycje",
        isReaded: false,
        dateTimeSend: moment().toISOString(),
        typeOfNotification: NotificationTypeEnum.ADVERTISMENTS,
        advertisementId: advertisementId,
      };

      const dataForUser: NotificationDAO = {
        userId: reserved.userId,
        title: "Rezygnacja z korepetycji",
        content: "Rezygnacja z korepetycji się powiodła",
        isReaded: false,
        dateTimeSend: moment().toISOString(),
        typeOfNotification: NotificationTypeEnum.ADVERTISMENTS,
        advertisementId: advertisementId,
      };

      const resultForTutor = await businessContainer
        .getNotificationManager()
        .createNewOrUpdate(dataForTutor);
      const resultForUser = await businessContainer
        .getNotificationManager()
        .createNewOrUpdate(dataForUser);
      const advertisement = await reservedEventDAO.removeById(advertisementId);
      return advertisement;
    }
  };

  const getAllReservationsForUserId = async (userId: string) => {
    const advertisement = await reservedEventDAO.getAllReservationsForUserId(
      userId
    );

    if (advertisement) {
      return advertisement;
    }
  };

  return {
    createNewOrUpdate,
    getAllReservationForTutor,
    getReservationById,
    removeById,
    getAllReservationsForUserId,
  };
};

export default {
  operations,
};
