import { NotificationTypeEnum } from "../enums/notificationType.enum";

export interface NotificationDAO {
  id?: string;
  userId: string;
  title: string;
  content: string;
  isReaded: boolean;
  dateTimeSend: string;
  typeOfNotification: NotificationTypeEnum;
}
