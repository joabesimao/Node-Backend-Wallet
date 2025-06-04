import { DbUpdatePosition } from "./db-update-position";
import { UpdatePositionRepository } from "../../../protocols/db/position/update-position";
import { Position } from "../../../../domain/models/position-model/position";

interface SutTypes {
  sut: DbUpdatePosition;
  updatePositionRepositoryStub: UpdatePositionRepository;
}

const makePosition = (): Position => ({
  id: 1,
  quantity: 1,
  stock: {
    id: 1,
    name: "any_name",
    valueStock: 10,
  },
});

const makePositionRepository = (): UpdatePositionRepository => {
  class UpdatePositionRepositoryStub implements UpdatePositionRepository {
    async update(id: number, info: Partial<Position>): Promise<Position> {
      return new Promise((resolve) => resolve(makePosition()));
    }
  }

  return new UpdatePositionRepositoryStub();
};

const makeSut = (): SutTypes => {
  const updatePositionRepositoryStub = makePositionRepository();
  const sut = new DbUpdatePosition(updatePositionRepositoryStub);
  return {
    sut,
    updatePositionRepositoryStub,
  };
};

describe("DbUpdatePosition Usecase", () => {
  const id = 8;
  test("Should call UpdatePositionRepository with correct values", async () => {
    const { sut, updatePositionRepositoryStub } = makeSut();
    const loadAllSpy = jest.spyOn(updatePositionRepositoryStub, "update");
    await sut.update(id, makePosition());
    expect(loadAllSpy).toHaveBeenCalledWith(8, makePosition());
  });

  test("Should throw if LoadOnePositionRepository throws", async () => {
    const { sut, updatePositionRepositoryStub } = makeSut();
    jest
      .spyOn(updatePositionRepositoryStub, "update")
      .mockReturnValueOnce(
        new Promise((resolve, reject) => reject(new Error("")))
      );

    const promise = sut.update(id, makePosition());
    await expect(promise).rejects.toThrow();
  });

  test("Should load one Position on success", async () => {
    const { sut } = makeSut();
    const client = await sut.update(id, makePosition());
    expect(client).toEqual(makePosition());
  });
});
