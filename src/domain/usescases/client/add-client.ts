import { Client, ClientModel } from "../../models/client-model/client";

export interface AddClientModel {
  name: string;
  document: string;
}

export interface AddClient {
  add(client: AddClientModel): Promise<Client>;
}
