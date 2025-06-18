import { DbLoadAllClients } from "../../../data/usescases/client-usecases/load-client/db-load-all-clients";
import { ClientRepository } from "../../../infra/db/mysql/client-repository/client";
import { LoadAllClientController } from "../../../presentation/controllers/client/load-all-client-controller/load-all-client-controller";
import { Controller } from "../../../presentation/protocols/controller/controller";

export const makeLoadAllClientController = (): Controller => {
  const loadAllClientRepository = new ClientRepository();
  const loadAllClient = new DbLoadAllClients(loadAllClientRepository);
  const loadClientController = new LoadAllClientController(loadAllClient);
  return loadClientController;
};
