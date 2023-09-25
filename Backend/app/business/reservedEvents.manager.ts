import { Context } from "vm";
import posterDAO from "../DAO/posterDAO";
import reservedEventDAO from "../DAO/reservedEventDAO";
import { PosterDAO } from "../shared/models/posterDAO.model";
import { ReservedPosterEventDAO } from "../shared/models/reservedPosterEventDAO.model";

const operations = (context: Context) => {
  const createNewOrUpdate = async (reservedData: ReservedPosterEventDAO) => {
    console.log("workdgfgfdgfdgfdgfd");
    const reserved = await reservedEventDAO.createNewOrUpdate(reservedData);
    if (reserved) {
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
    const posters = await reservedEventDAO.getAllReservationForTutor(userId);
    if (posters) {
      return posters;
    }
  };

  const removeReservationById = async (posterId: string) => {
    const poster = await reservedEventDAO.removeById(posterId);
    if (poster) {
      return poster;
    }
  };

  const getAllReservationForPosterId = async (posterId: string) => {
    const poster = await reservedEventDAO.getAllReservationForPosterId(
      posterId
    );

    if (poster) {
      return poster;
    }
  };

  const getAllReservationsForUserId = async (userId: string) => {
    const poster = await reservedEventDAO.getAllReservationsForUserId(userId);

    if (poster) {
      return poster;
    }
  };

  return {
    createNewOrUpdate,
    getAllReservationForTutor,
    getReservationById,
    removeReservationById,
    getAllReservationForPosterId,
    getAllReservationsForUserId,
  };
};

export default {
  operations,
};
