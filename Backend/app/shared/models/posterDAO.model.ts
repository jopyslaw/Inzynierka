import { CategoryEnum } from "../enums/category.enum";

export interface PosterDAO {
  id?: string;
  userId: string;
  title: string;
  category: CategoryEnum;
  description: string;
  price: string;
  events?: [];
}
