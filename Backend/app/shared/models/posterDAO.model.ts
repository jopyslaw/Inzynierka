import { CategoryEnum } from "../enums/category.enum";

export interface PosterDAO {
  id?: string;
  userId: string;
  title: string;
  category: CategoryEnum;
  description: string;
  price: string;
  events: [];
}

export interface EventDAO {
  id: string;
  title: string;
  start: string;
  end: string;
  allDay: boolean;
  editable: boolean;
}
