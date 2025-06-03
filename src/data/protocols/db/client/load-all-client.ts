import { Client } from "../../../../domain/models/client-model/client";

export interface LoadAllClientRepository {
  loadAll(): Promise<Client[]>;
}
