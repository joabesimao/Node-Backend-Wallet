import { Client } from "../../../../domain/models/client-model/client";

export interface UpdateClientRepository {
  update(id: number, info: Partial<Client>): Promise<Client>;
}
