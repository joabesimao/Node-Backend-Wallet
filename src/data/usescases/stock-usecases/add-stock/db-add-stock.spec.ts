import { DbAddStock } from "./db-add-stock";
import { Stock, StockModel } from "../../../../domain/models/stock-model/stock";
import {
  AddStock,
  AddStockModel,
} from "../../../../domain/usescases/stock/add-stock";
import { AddWalletRepository } from "../../../protocols/db/wallet/add-wallet";
import { Wallet } from "../../../../domain/models/wallet-model/wallet";
import { AddWalletModel } from "../../../../domain/usescases/wallet/add-wallet";
import { AddStockRepository } from "../../../protocols/db/stock/add-stock";

interface SutTypes {
  sut: DbAddStock;
  stockRepositoryStub: AddStockRepository;
}

const makeAddStock = (): AddStockModel => ({
  stock: {
    name: "any_name",
    valueStock: 10,
  },
});

const makeStock = (): Stock => ({
  id: 1,
  name: "any_name",
  valueStock: 10,
});

const makeStockRepository = (): AddStockRepository => {
  class StockRepositoryStub implements AddStockRepository {
    async add(stock: AddStockModel): Promise<Stock> {
      return new Promise((resolve) => resolve(makeStock()));
    }
  }
  return new StockRepositoryStub();
};

const makeSut = (): SutTypes => {
  const stockRepositoryStub = makeStockRepository();
  const sut = new DbAddStock(stockRepositoryStub);
  return {
    sut,
    stockRepositoryStub,
  };
};

describe("DbAddStock Usecase", () => {
  test("Should call AddStockRepository with correct values", async () => {
    const { sut, stockRepositoryStub } = makeSut();
    const addStockSpy = jest.spyOn(stockRepositoryStub, "add");
    await sut.add(makeAddStock());
    expect(addStockSpy).toHaveBeenCalledWith(makeAddStock());
  });

  test("Should add a Stock on success", async () => {
    const { sut } = makeSut();
    const client = await sut.add(makeAddStock());
    expect(client).toEqual(makeStock());
  });

  test("Should throw if addStockRepository throws", async () => {
    const { sut, stockRepositoryStub } = makeSut();
    jest
      .spyOn(stockRepositoryStub, "add")
      .mockReturnValueOnce(
        new Promise((resolve, reject) => reject(new Error("")))
      );

    const promise = sut.add(makeAddStock());
    await expect(promise).rejects.toThrow();
  });
});
