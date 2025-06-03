import { Client } from "../../../../domain/models/client-model/client";
import { LoadClientById } from "../../../../domain/usescases/client/load-client";
import { LoadOneClientRepository } from "../../../protocols/db/client/load-one-client";

export class DbLoadOneClient implements LoadClientById {
  constructor(private readonly loadByIdRepository: LoadOneClientRepository) {}
  async loadOne(id: number): Promise<Client> {
    const oneClient = await this.loadByIdRepository.loadOne(id);
    return oneClient;
  }
}
