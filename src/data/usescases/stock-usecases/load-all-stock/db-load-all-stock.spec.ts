import { DbLoadAllStock } from "./db-load-all-stock";
import { Stock } from "../../../../domain/models/stock-model/stock";
import { LoadAllStockRepository } from "../../../protocols/db/stock/load-all-stock";

interface SutTypes {
  sut: DbLoadAllStock;
  stockAllRepositoryStub: LoadAllStockRepository;
}

const makeStockList = (): Stock[] => [
  { id: 1, name: "any_name", valueStock: 10 },
  { id: 2, name: "other_name", valueStock: 15 },
];

const makeStockRepository = (): LoadAllStockRepository => {
  class StockRepositoryStub implements LoadAllStockRepository {
    async loadAll(): Promise<Stock[]> {
      return new Promise((resolve) => resolve(makeStockList()));
    }
  }
  return new StockRepositoryStub();
};

const makeSut = (): SutTypes => {
  const stockAllRepositoryStub = makeStockRepository();
  const sut = new DbLoadAllStock(stockAllRepositoryStub);
  return {
    sut,
    stockAllRepositoryStub,
  };
};

describe("DbLoadAllStock Usecase", () => {
  test("Should call LoadAllStockRepository with correct values", async () => {
    const { sut, stockAllRepositoryStub } = makeSut();
    const loadAllStockSpy = jest.spyOn(stockAllRepositoryStub, "loadAll");
    await sut.loadAll();
    expect(loadAllStockSpy).toHaveBeenCalled();
  });

  test("Should load a list of Stock on success", async () => {
    const { sut } = makeSut();
    const loadAllStock = await sut.loadAll();
    expect(loadAllStock).toEqual(makeStockList());
  });

  test("Should throw if LoadAllStockRepository throws", async () => {
    const { sut, stockAllRepositoryStub } = makeSut();
    jest
      .spyOn(stockAllRepositoryStub, "loadAll")
      .mockReturnValueOnce(
        new Promise((resolve, reject) => reject(new Error("")))
      );

    const promise = sut.loadAll();
    await expect(promise).rejects.toThrow();
  });
});
