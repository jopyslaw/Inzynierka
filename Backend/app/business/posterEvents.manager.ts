import { Context } from "vm";
import posterEventsDAO from "../DAO/posterEventsDAO";
import reservedEventDAO from "../DAO/reservedEventDAO";

const operations = (context: Context) => {
  const getPosterEventsById = async (id: string) => {
    const poster = await posterEventsDAO.getPosterEventById(id);
    const reservedPosters = await reservedEventDAO.getAllReservationForPosterId(
      id
    );
    if (poster) {
      console.log("poster", poster);

      console.log("reservedPoster", reservedPosters);

      const preparedData = poster.map((poster) => {
        return {
          ...poster,
          reserved:
            reservedPosters?.find(
              (reservation) =>
                reservation.posterEventId.toString() === poster._id.toString()
            )?.reserved ?? null,
        };
      });

      console.log("preparedData", preparedData);

      return preparedData;
    }
  };

  const getAllPostersEventsByUserId = async (userId: string) => {
    const posters = await posterEventsDAO.getAllUserPostersEvents(userId);
    if (posters) {
      return posters;
    }
  };

  const removePosterById = async (posterId: string) => {
    const poster = await posterEventsDAO.removeById(posterId);
    if (poster) {
      return poster;
    }
  };

  const getAllReseveredEventsForUser = async (userId: string) => {
    console.log("sadadad");
    const reservedData = await reservedEventDAO.getAllReservationsForUserId(
      userId
    );
    const eventsIds = reservedData?.map((event) => event.posterEventId);

    if (eventsIds) {
      const eventsForUser = await posterEventsDAO.getAllPosterWithIds(
        eventsIds
      );

      return eventsForUser;
    }
  };

  return {
    getPosterEventsById,
    getAllPostersEventsByUserId,
    removePosterById,
    getAllReseveredEventsForUser,
  };
};

export default {
  operations,
};
