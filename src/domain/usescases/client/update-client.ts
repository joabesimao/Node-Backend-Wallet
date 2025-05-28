import { Client } from "../../models/client-model/client";

export interface UpdateClient {
  update(id: number, info: Partial<Client>): Promise<Client>;
}
