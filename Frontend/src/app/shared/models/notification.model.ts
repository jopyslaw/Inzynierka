export interface Notification {
  _id?: string;
  userId: string;
  title: string;
  content: string;
  isReaded: boolean;
  dateTimeSend: string;
  advertisementId: string;
}
