import { Context } from "vm";
import advertisementDAO from "../DAO/advertisementDAO";
import posterEventsDAO from "../DAO/advertisementEventDAO";
import { AdvertisementDAO } from "../shared/models/advertisementDAO.model";

const operations = (context: Context) => {
  const createNewOrUpdate = async (advertisement: AdvertisementDAO) => {
    const { events, ...preparedData } = advertisement;
    const advertisementData = await advertisementDAO.createNewOrUpdate(preparedData);

    if (advertisementData) {
      const data = events?.map((event: any) => {
        return { ...event, Id: advertisementData.id, userId: advertisementData.userId };
      });
      await posterEventsDAO.createNewOrUpdate(data as any);
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
    const advertisements = await advertisementDAO.getAllUserAdvertisement(userId);
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

  return {
    createNewOrUpdate,
    getAllAdvertisementsByUserId,
    getById,
    removeAdvertisementById,
    getAllAdvertisement,
  };
};

export default {
  operations,
};
