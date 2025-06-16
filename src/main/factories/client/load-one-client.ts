import { DbLoadOneClient } from "../../../data/usescases/client-usecases/load-one-client/db-load-one-client";
import { ClientRepository } from "../../../infra/db/mysql/client-repository/client";
import { LoadOneController } from "../../../presentation/controllers/client/load-one-controller/load-one-client-controller";
import { Controller } from "../../../presentation/protocols/controller/controller";

export const makeLoadOneClientController = (): Controller => {
  const loadOneClientRepository = new ClientRepository();
  const loadOneClient = new DbLoadOneClient(loadOneClientRepository);
  const loadOneClientController = new LoadOneController(loadOneClient);
  return loadOneClientController;
};
