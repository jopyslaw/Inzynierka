import moment from "moment";
import businessContainer from "./business/business.container";
import { AdvertisementDAO } from "./shared/models/advertisementDAO.model";

export const activateAdvertismentsIfStartDateIsToday = async () => {
  console.log("first job start");
  const advertisments = await businessContainer
    .getPosterManager()
    .getAllInActiveAndNotArchivedAdvertisments();

  const currentDate = moment().format("YYYY-MM-DD");

  const advertismentsToActivate = advertisments.filter(
    (advertisment: AdvertisementDAO) => {
      const advertismentStartDate = moment(advertisment.startDate).format(
        "YYYY-MM-DD"
      );
      if (currentDate === advertismentStartDate) {
        return true;
      }
      return false;
    }
  );

  const advertismentsIds = advertismentsToActivate.map(
    (advertisment: AdvertisementDAO) => advertisment.id
  );

  await businessContainer
    .getPosterManager()
    .activateAdvertisments(advertismentsIds);
  console.log("first job end");
  await deActivateAdvertismentsIfEndDateIsNotToday();
};

export const deActivateAdvertismentsIfEndDateIsNotToday = async () => {
  console.log("second job started");
  const advertisments = await businessContainer
    .getPosterManager()
    .getAllInActiveAndNotArchivedAdvertisments();

  const currentDate = moment().subtract(1, "days").format("YYYY-MM-DD");

  const advertismentsToDeactivate = advertisments.filter(
    (advertisment: AdvertisementDAO) => {
      const advertismentEndDate = moment(advertisment.endDate).format(
        "YYYY-MM-DD"
      );
      if (currentDate === advertismentEndDate) {
        return true;
      }
      return false;
    }
  );

  const advertismentsIds = advertismentsToDeactivate.map(
    (advertisment: AdvertisementDAO) => advertisment.id
  );

  await businessContainer
    .getPosterManager()
    .deactivateAdvertisments(advertismentsIds);

  console.log("second Job ended");
};
