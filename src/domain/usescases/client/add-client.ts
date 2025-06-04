import { Client, ClientModel } from "../../models/client-model/client";

export interface AddClientModel {
  client: ClientModel;
}

export interface AddClient {
  add(client: AddClientModel): Promise<Client>;
}
