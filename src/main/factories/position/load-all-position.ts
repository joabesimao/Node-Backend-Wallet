import { DbLoadAllPositions } from "../../../data/usescases/position-usecases/load-all-position/db-load-all-position";
import { PositionRepository } from "../../../infra/db/mysql/position-repository/position";
import { LoadAllPositionController } from "../../../presentation/controllers/position/load-all-position-controller/load-all-position-controller";
import { Controller } from "../../../presentation/protocols/controller/controller";

export const makeLoadAllPositionController = (): Controller => {
  const loadAllPositionRepository = new PositionRepository();
  const loadAllPosition = new DbLoadAllPositions(loadAllPositionRepository);
  const loadAllPositionController = new LoadAllPositionController(
    loadAllPosition
  );
  return loadAllPositionController;
};
