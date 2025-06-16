import { DbUpdatePosition } from "../../../data/usescases/position-usecases/update-position/db-update-position";
import { PositionRepository } from "../../../infra/db/mysql/position-repository/position";
import { UpdatePositionController } from "../../../presentation/controllers/position/update-position-controller/update-position-controller";
import { Controller } from "../../../presentation/protocols/controller/controller";

export const makeUpdatePositionController = (): Controller => {
  const updatePositionRepository = new PositionRepository();
  const updatePosition = new DbUpdatePosition(updatePositionRepository);
  const updatePositionController = new UpdatePositionController(updatePosition);
  return updatePositionController;
};
