import { AddClientModel } from "../../../../domain/usescases/client/add-client";
import { Client } from "../../../../domain/models/client-model/client";

export interface AddClientRepository {
  add(client: AddClientModel): Promise<Client>;
}
