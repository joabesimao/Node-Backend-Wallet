import { DbLoadOnePosition } from "../../../data/usescases/position-usecases/load-one-position/db-load-one-position";
import { PositionRepository } from "../../../infra/db/mysql/position-repository/position";
import { LoadOnePositionController } from "../../../presentation/controllers/position/load-one-position-controller/load-one-position-controller";
import { Controller } from "../../../presentation/protocols/controller/controller";

export const makeLoadOnePositionController = (): Controller => {
  const loadOnePositionRepository = new PositionRepository();
  const loadOnePosition = new DbLoadOnePosition(loadOnePositionRepository);
  const loadOnePositionController = new LoadOnePositionController(
    loadOnePosition
  );
  return loadOnePositionController;
};
