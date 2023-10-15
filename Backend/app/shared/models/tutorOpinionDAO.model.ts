import { CategoryEnum } from "../enums/category.enum";

export interface TutorOpinionDAO {
  id?: string;
  userId: string;
  tutorId: string;
  title: string;
  description: string;
  rating: string;
}
