import { IUser } from "./i-user";

export interface IResponse {

  message: string;
  dateResponse: Date;
  response: IUser
}
