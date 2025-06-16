import { DbDeletePosition } from "../../../data/usescases/position-usecases/delete-position/db-delete-position";
import { PositionRepository } from "../../../infra/db/mysql/position-repository/position";
import { DeletePositionController } from "../../../presentation/controllers/position/delete-position-controller/delete-position-controller";
import { Controller } from "../../../presentation/protocols/controller/controller";

export const makeDeletePositionController = (): Controller => {
  const deletePositionRepository = new PositionRepository();
  const deletePosition = new DbDeletePosition(deletePositionRepository);
  const deletePositionController = new DeletePositionController(deletePosition);
  return deletePositionController;
};
