import { Context } from "vm";
import advertisementEventDAO from "../DAO/advertisementEventDAO";
import reservedEventDAO from "../DAO/reservedEventDAO";
import advertisementDAO from "../DAO/advertisementDAO";

const operations = (context: Context) => {
  const getAdvertisementEventsById = async (id: string) => {
    console.log(id);

    const advertisements =
      await advertisementEventDAO.getAdvertisementEventById(id);

    if (advertisements) {
      const advertisementIds = advertisements.map((advertisment) =>
        advertisment._id.toString()
      );

      console.log(advertisementIds);

      const reservedPosters =
        await reservedEventDAO.getAllReservationForPosterId(advertisementIds);
      const preparedData = advertisements.map((advertisement) => {
        return {
          ...advertisement,
          reserved:
            reservedPosters?.find(
              (reservation) =>
                reservation.advertisementEventId.toString() ===
                advertisement._id.toString()
            )?.reserved ?? null,
        };
      });

      return preparedData;
    }
  };

  const getAllAdvertisementEventsByUserId = async (userId: string) => {
    const advertisments = await advertisementDAO.getAllUserAdvertisement(
      userId
    );

    const ids = advertisments.map((advertisment) =>
      advertisment._id.toString()
    );

    console.log("ids", ids);

    const posters = await advertisementEventDAO.getAllUserAdvertisementEvents(
      ids
    );

    if (posters) {
      return posters;
    }
  };

  const removeAdvertisementById = async (posterId: string) => {
    const poster = await advertisementEventDAO.removeById(posterId);
    if (poster) {
      return poster;
    }
  };

  const getAllReseveredEventsForUser = async (userId: string) => {
    const reservedData = await reservedEventDAO.getAllReservationsForUserId(
      userId
    );

    const eventsIds = reservedData?.map((event) => event.advertisementEventId);

    if (eventsIds) {
      const eventsForUser =
        await advertisementEventDAO.getAllAdvertisementWithIds(eventsIds);

      const preparedData = eventsForUser?.map((event) => {
        return {
          ...event,
          reservedId:
            reservedData?.find(
              (reservation) =>
                reservation.advertisementEventId.toString() ===
                event._id.toString()
            )?._id ?? null,
        };
      });

      return preparedData;
    }
  };

  return {
    getAdvertisementEventsById,
    getAllAdvertisementEventsByUserId,
    removeAdvertisementById,
    getAllReseveredEventsForUser,
  };
};

export default {
  operations,
};
