import { CategoryAdvertisementEnum } from '../enums/categoryAdvertisement.enum';

export interface AdvertisementModel {
  id: string;
  userId: string;
  title: string;
  description: string;
  price: string;
  events: AdvertisementEventsModel[];
  category: CategoryAdvertisementEnum;
  _id?: string;
  startDate?: string;
  endDate?: string;
}

export interface AdvertisementEventsModel {
  id?: string;
  title: string;
  start: string;
  end: string;
  allDay: boolean;
  reserved?: boolean;
  backgroundColor?: string;
}
