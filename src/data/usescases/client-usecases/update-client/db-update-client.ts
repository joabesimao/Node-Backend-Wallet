import { Client } from "../../../../domain/models/client-model/client";
import { UpdateClient } from "../../../../domain/usescases/client/update-client";
import { UpdateClientRepository } from "../../../protocols/db/client/update-client";

export class DbUpdateClient implements UpdateClient {
  constructor(
    private readonly updateClientRepository: UpdateClientRepository
  ) {}
  async update(id: number, info: Partial<Client>): Promise<Client> {
    const clientUpdated = await this.updateClientRepository.update(id, info);
    return clientUpdated;
  }
}
