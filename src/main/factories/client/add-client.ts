import { DbAddClient } from "../../../data/usescases/client-usecases/add-client/db-add-client";
import { ClientRepository } from "../../../infra/db/mysql/client-repository/client";
import { AddClientController } from "../../../presentation/controllers/client/add-client-controller/add-client-controller";
import { Controller } from "../../../presentation/protocols/controller/controller";

export const makeAddClientController = (): Controller => {
  const addClientRepository = new ClientRepository();
  const addClient = new DbAddClient(addClientRepository);
  const addClientController = new AddClientController(addClient);
  return addClientController;
};
