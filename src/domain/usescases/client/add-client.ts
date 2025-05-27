import { Client } from "../../models/client-model/client";

export interface AddClientModel {
  client: Client;
}

export interface AddClient {
  add(client: AddClientModel): Promise<Client>;
}
