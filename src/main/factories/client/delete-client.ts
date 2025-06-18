import { DbDeleteClient } from "../../../data/usescases/client-usecases/delete-client/db-delete-client";
import { ClientRepository } from "../../../infra/db/mysql/client-repository/client";
import { DeleteClientController } from "../../../presentation/controllers/client/delete-client-controller/delete-client-controller";
import { Controller } from "../../../presentation/protocols/controller/controller";

export const makeDeleteClientController = (): Controller => {
  const deleteClientRepository = new ClientRepository();
  const deleteClient = new DbDeleteClient(deleteClientRepository);
  const deleteClientController = new DeleteClientController(deleteClient);
  return deleteClientController;
};
