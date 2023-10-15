export interface MessageDAO {
  id?: string;
  senderId: string;
  userId: string;
  title: string;
  content: string;
  isReaded: boolean;
  dateTimeSend: String;
}
