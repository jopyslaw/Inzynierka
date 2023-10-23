import { CategoryPosterEnum } from '../enums/categoryPoster.enum';

export interface PosterModel {
  id: string;
  userId: string;
  title: string;
  description: string;
  price: string;
  events: PosterEventsModel[];
  category: CategoryPosterEnum;
  _id?: string;
}

export interface PosterEventsModel {
  id: string;
  title: string;
  start: string;
  end: string;
  allDay: boolean;
  reserved?: boolean;
  backgroundColor?: string;
}
