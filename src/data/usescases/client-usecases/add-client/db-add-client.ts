import { Client } from "../../../../domain/models/client-model/client";
import {
  AddClient,
  AddClientModel,
} from "../../../../domain/usescases/client/add-client";
import { AddClientRepository } from "../../../protocols/db/client/add-client";

export class DbAddClient implements AddClient {
  constructor(private readonly addCLientRepository: AddClientRepository) {}
  async add(client: AddClientModel): Promise<Client> {
    const addClient = await this.addCLientRepository.add(client);
    return addClient;
  }
}
