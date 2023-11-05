export interface MessageDAO {
  id?: string;
  senderId: string;
  reciverId: string;
  title: string;
  content: string;
  isReaded: boolean;
  dateTimeSend: String;
}
