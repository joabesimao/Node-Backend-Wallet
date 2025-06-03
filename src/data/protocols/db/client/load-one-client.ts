import { Client } from "../../../../domain/models/client-model/client";

export interface LoadOneClientRepository {
  loadOne(id: number): Promise<Client>;
}
