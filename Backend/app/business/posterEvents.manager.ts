import { Context } from "vm";
import posterEventsDAO from "../DAO/posterEventsDAO";

const operations = (context: Context) => {
  const getPosterEventsById = async (id: string) => {
    console.log("Im working xDDD", id);
    const poster = await posterEventsDAO.getPosterEventById(id);
    if (poster) {
      return poster;
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

  return {
    getPosterEventsById,
    getAllPostersEventsByUserId,
    removePosterById,
  };
};

export default {
  operations,
};
