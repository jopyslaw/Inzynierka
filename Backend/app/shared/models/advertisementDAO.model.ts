import { CategoryEnum } from "../enums/category.enum";

export interface AdvertisementDAO {
  id?: string;
  userId: string;
  title: string;
  category: CategoryEnum;
  description: string;
  price: string;
  events?: [];
  startDate: string;
  endDate: string;
}
