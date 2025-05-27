import { Client } from "../../models/client-model/client";

export interface LoadClient {
  load(): Promise<Client[]>;
}
