import { TokenType } from "../enums/tokenType.enum";

export interface TokenDAO {
  userId: string;
  createDate: string;
  type: TokenType;
  value: string;
}
