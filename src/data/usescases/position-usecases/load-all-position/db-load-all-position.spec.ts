import { DbLoadAllPositions } from "./db-load-all-position";
import { LoadAllPositionRepository } from "../../../protocols/db/position/load-all-position";
import { Position } from "../../../../domain/models/position-model/position";

interface SutTypes {
  sut: DbLoadAllPositions;
  loadPositionRepositoryStub: LoadAllPositionRepository;
}

const makePositionList = (): Position[] => [
  {
    id: 1,
    quantity: 1,
    stock: {
      id: 1,
      name: "any_name",
      valueStock: 10,
    },
  },
  {
    id: 2,
    quantity: 10,
    stock: {
      id: 2,
      name: "other_name",
      valueStock: 11,
    },
  },
];

const makePositionRepository = (): LoadAllPositionRepository => {
  class LoadAllPositionRepositoryStub implements LoadAllPositionRepository {
    async loadAll(): Promise<Position[]> {
      return new Promise((resolve) => resolve(makePositionList()));
    }
  }
  return new LoadAllPositionRepositoryStub();
};

const makeSut = (): SutTypes => {
  const loadPositionRepositoryStub = makePositionRepository();
  const sut = new DbLoadAllPositions(loadPositionRepositoryStub);
  return {
    sut,
    loadPositionRepositoryStub,
  };
};

describe("DbLoadAllPosition Usecase", () => {
  test("Should call LoadAllPositionRepository with correct values", async () => {
    const { sut, loadPositionRepositoryStub } = makeSut();
    const loadAllSpy = jest.spyOn(loadPositionRepositoryStub, "loadAll");
    await sut.loadAll();
    expect(loadAllSpy).toHaveBeenCalled();
  });

  test("Should throw if LoadAllPositionRepository throws", async () => {
    const { sut, loadPositionRepositoryStub } = makeSut();
    jest
      .spyOn(loadPositionRepositoryStub, "loadAll")
      .mockReturnValueOnce(
        new Promise((resolve, reject) => reject(new Error("")))
      );

    const promise = sut.loadAll();
    await expect(promise).rejects.toThrow();
  });

  test("Should load a list of position on success", async () => {
    const { sut } = makeSut();
    const client = await sut.loadAll();
    expect(client).toEqual(makePositionList());
  });
});
