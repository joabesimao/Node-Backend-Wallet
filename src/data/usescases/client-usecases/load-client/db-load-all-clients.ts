import { Client } from "../../../../domain/models/client-model/client";
import { LoadClient } from "../../../../domain/usescases/client/load-client";
import { LoadAllClientRepository } from "../../../protocols/db/client/load-all-client";

export class DbLoadAllClients implements LoadClient {
  constructor(private readonly loadClientRepository: LoadAllClientRepository) {}
  async load(): Promise<Client[]> {
    const allClients = await this.loadClientRepository.loadAll();
    return allClients;
  }
}
