import { DbLoadOneStock } from "./db-load-one-stock";
import { Stock } from "../../../../domain/models/stock-model/stock";
import { LoadOneStockRepository } from "../../../protocols/db/stock/load-one-stock";

interface SutTypes {
  sut: DbLoadOneStock;
  loadStockOneRepositoryStub: LoadOneStockRepository;
}

const makeStock = (): Stock => ({ id: 1, name: "any_name", valueStock: 10 });

const makeStockRepository = (): LoadOneStockRepository => {
  class loadOneStockRepositoryStub implements LoadOneStockRepository {
    async loadOne(id: number): Promise<Stock> {
      return new Promise((resolve) => resolve(makeStock()));
    }
  }

  return new loadOneStockRepositoryStub();
};

const makeSut = (): SutTypes => {
  const loadStockOneRepositoryStub = makeStockRepository();
  const sut = new DbLoadOneStock(loadStockOneRepositoryStub);
  return {
    sut,
    loadStockOneRepositoryStub,
  };
};

describe("DbLoadOneStock Usecase", () => {
  const id = 8;
  test("Should call LoadOneStockRepository with correct values", async () => {
    const { sut, loadStockOneRepositoryStub } = makeSut();
    const loadOneStockSpy = jest.spyOn(loadStockOneRepositoryStub, "loadOne");
    await sut.loadOne(id);
    expect(loadOneStockSpy).toHaveBeenCalledWith(8);
  });

  test("Should load one Stock on success", async () => {
    const { sut } = makeSut();
    const loadOneStock = await sut.loadOne(id);
    expect(loadOneStock).toEqual(makeStock());
  });

  test("Should throw if LoadOneStockRepository throws", async () => {
    const { sut, loadStockOneRepositoryStub } = makeSut();
    jest
      .spyOn(loadStockOneRepositoryStub, "loadOne")
      .mockReturnValueOnce(
        new Promise((resolve, reject) => reject(new Error("")))
      );

    const promise = sut.loadOne(id);
    await expect(promise).rejects.toThrow();
  });
});
