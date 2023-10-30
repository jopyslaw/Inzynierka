export interface Notification {
  id?: string;
  userId: string;
  title: string;
  content: string;
  isReaded: boolean;
  dateTimeSend: string;
}
