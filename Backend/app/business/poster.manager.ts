import { Context } from "vm";
import { AdvertisementDAO } from "../shared/models/AdvertisementDAO.model";
import posterDAO from "../DAO/advertisementDAO";
import posterEventsDAO from "../DAO/advertisementEventDAO";

const operations = (context: Context) => {
  const createNewOrUpdate = async (poster: AdvertisementDAO) => {
    const { events, ...preparedData } = poster;
    const posterData = await posterDAO.createNewOrUpdate(preparedData);
    console.log("posterData", posterData);
    if (posterData) {
      const data = events?.map((event: any) => {
        return { ...event, posterId: posterData.id, userId: posterData.userId };
      });
      await posterEventsDAO.createNewOrUpdate(data as any);
      return posterData;
    }
  };

  const getPosterById = async (id: string) => {
    const poster = await posterDAO.getPosterById(id);
    if (poster) {
      return poster;
    }
  };

  const getAllPostersByUserId = async (userId: string) => {
    const posters = await posterDAO.getAllUserPosters(userId);
    if (posters) {
      return posters;
    }
  };

  const getAllPosters = async () => {
    const posters = await posterDAO.getAllPosters();
    if (posters) {
      return posters;
    }
  };

  const removePosterById = async (posterId: string) => {
    const poster = await posterDAO.removeById(posterId);
    if (poster) {
      return poster;
    }
  };

  return {
    createNewOrUpdate,
    getPosterById,
    getAllPostersByUserId,
    removePosterById,
    getAllPosters,
  };
};

export default {
  operations,
};
