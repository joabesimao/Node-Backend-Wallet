import { DbAddPosition } from "../../../data/usescases/position-usecases/add-position/db-add-position";
import { PositionRepository } from "../../../infra/db/mysql/position-repository/position";
import { AddPositionController } from "../../../presentation/controllers/position/add-position-controller/add-position-controller";
import { Controller } from "../../../presentation/protocols/controller/controller";

export const makeAddPositionController = (): Controller => {
  const addPositionRepository = new PositionRepository();
  const addPosition = new DbAddPosition(addPositionRepository);
  const addPositionController = new AddPositionController(addPosition);
  return addPositionController;
};
