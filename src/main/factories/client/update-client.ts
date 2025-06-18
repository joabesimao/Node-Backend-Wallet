import { DbUpdateClient } from "../../../data/usescases/client-usecases/update-client/db-update-client";
import { ClientRepository } from "../../../infra/db/mysql/client-repository/client";
import { UpdateClientController } from "../../../presentation/controllers/client/update-client-controller/update-client-controller";
import { Controller } from "../../../presentation/protocols/controller/controller";

export const makeUpdateClientController = (): Controller => {
  const updateClientRepository = new ClientRepository();
  const updateClient = new DbUpdateClient(updateClientRepository);
  const updateClientController = new UpdateClientController(updateClient);
  return updateClientController;
};
