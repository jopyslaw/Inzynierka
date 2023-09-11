import { Context } from "vm";
import { PosterDAO } from "../shared/models/posterDAO.model";
import posterDAO from "../DAO/posterDAO";

const operations = (context: Context) => {
  const createNewOrUpdate = async (poster: PosterDAO) => {
    const posterData = await posterDAO.createNewOrUpdate(poster);
    if (posterData) {
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
  };
};

export default {
  operations,
};
