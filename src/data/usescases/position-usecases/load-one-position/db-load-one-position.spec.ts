import { DbLoadOnePosition } from "./db-load-one-position";
import { LoadOnePositionRepository } from "../../../protocols/db/position/load-one-position";
import { Position } from "../../../../domain/models/position-model/position";

interface SutTypes {
  sut: DbLoadOnePosition;
  loadOnePositionRepositoryStub: LoadOnePositionRepository;
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

const makePositionRepository = (): LoadOnePositionRepository => {
  class LoadOnePositionRepositoryStub implements LoadOnePositionRepository {
    async loadOne(id: number): Promise<Position> {
      return new Promise((resolve) => resolve(makePosition()));
    }
  }

  return new LoadOnePositionRepositoryStub();
};

const makeSut = (): SutTypes => {
  const loadOnePositionRepositoryStub = makePositionRepository();
  const sut = new DbLoadOnePosition(loadOnePositionRepositoryStub);
  return {
    sut,
    loadOnePositionRepositoryStub,
  };
};

describe("DbLoadOnePosition Usecase", () => {
  const id = 8;
  test("Should call LoadOnePositionRepository with correct values", async () => {
    const { sut, loadOnePositionRepositoryStub } = makeSut();
    const loadAllSpy = jest.spyOn(loadOnePositionRepositoryStub, "loadOne");
    await sut.loadById(id);
    expect(loadAllSpy).toHaveBeenCalledWith(8);
  });

  test("Should throw if LoadOnePositionRepository throws", async () => {
    const { sut, loadOnePositionRepositoryStub } = makeSut();
    jest
      .spyOn(loadOnePositionRepositoryStub, "loadOne")
      .mockReturnValueOnce(
        new Promise((resolve, reject) => reject(new Error("")))
      );

    const promise = sut.loadById(id);
    await expect(promise).rejects.toThrow();
  });

  test("Should load one Position on success", async () => {
    const { sut } = makeSut();
    const client = await sut.loadById(id);
    expect(client).toEqual(makePosition());
  });
});
