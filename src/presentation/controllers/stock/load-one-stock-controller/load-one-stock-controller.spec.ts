import { LoadOneStockController } from "./load-one-stock-controller";
import { LoadOneStock } from "../../../../domain/usescases/stock/load-stock";
import { LoadAllStock } from "../../../../domain/usescases/stock/load-stock";
import { HttpRequest } from "../../../protocols/http/http";
import { ok, serverError } from "../../../helpers/http/http-helper";
import {
  AddStock,
  AddStockModel,
} from "../../../../domain/usescases/stock/add-stock";
import { Stock, StockModel } from "../../../../domain/models/stock-model/stock";

const makeFakeRequest = (): HttpRequest => ({
  body: makeFakeStockModel(),
  params: {
    id: 1,
  },
});

const makeFakeStock = (): Stock => ({
  id: 1,
  name: "any_name",
  valueStock: 10,
});

const makeFakeStockModel = (): StockModel => ({
  name: "any_name",
  valueStock: 5,
});

interface SutTypes {
  sut: LoadOneStockController;
  loadOneStockStub: LoadOneStock;
}
const makeLoadOneStockStub = (): LoadOneStock => {
  class LoadOneStockStub implements LoadOneStock {
    async loadOne(id: number): Promise<Stock> {
      return new Promise((resolve) => resolve(makeFakeStock()));
    }
  }
  return new LoadOneStockStub();
};

const makeSut = (): SutTypes => {
  const loadOneStockStub = makeLoadOneStockStub();
  const sut = new LoadOneStockController(loadOneStockStub);
  return {
    sut,
    loadOneStockStub,
  };
};

describe("LoadOneStock Controller", () => {
  test("Should call LoadOneStock with correct values", async () => {
    const { sut, loadOneStockStub } = makeSut();
    const loadAllStockSpy = jest.spyOn(loadOneStockStub, "loadOne");
    const fakeRequest = makeFakeRequest();
    await sut.handle(fakeRequest);
    expect(loadAllStockSpy).toHaveBeenCalledWith(1);
  });

  test("Should return 500 if LoadOneStock throws", async () => {
    const { sut, loadOneStockStub } = makeSut();
    jest
      .spyOn(loadOneStockStub, "loadOne")
      .mockReturnValueOnce(
        new Promise((resolve, reject) => reject(new Error()) as any)
      );
    const fakeRequest = makeFakeRequest();
    const httpResponse = await sut.handle(fakeRequest);
    expect(httpResponse).toEqual(serverError(new Error()));
  });

  test("Should load a Stock and return 200 on sucess", async () => {
    const { sut } = makeSut();
    const httpResponse = await sut.handle(makeFakeRequest());
    expect(httpResponse).toEqual(ok(makeFakeStock()));
  });
});
