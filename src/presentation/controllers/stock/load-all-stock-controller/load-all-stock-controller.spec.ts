import { LoadAllStockController } from "./load-all-stock-controller";
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
});

const makeFakeStockList = (): Stock[] => [
  {
    id: 1,
    name: "any_name",
    valueStock: 10,
  },
  {
    id: 2,
    name: "other_name",
    valueStock: 1,
  },
];

const makeFakeStockModel = (): StockModel => ({
  name: "any_name",
});

interface SutTypes {
  sut: LoadAllStockController;
  loadAllStockStub: LoadAllStock;
}
const makeLoadAllStockStub = (): LoadAllStock => {
  class LoadAllStockStub implements LoadAllStock {
    async loadAll(): Promise<Stock[]> {
      return new Promise((resolve) => resolve(makeFakeStockList()));
    }
  }
  return new LoadAllStockStub();
};

const makeSut = (): SutTypes => {
  const loadAllStockStub = makeLoadAllStockStub();
  const sut = new LoadAllStockController(loadAllStockStub);
  return {
    sut,
    loadAllStockStub,
  };
};

describe("LoadAllStock Controller", () => {
  test("Should call LoadAllStock with correct values", async () => {
    const { sut, loadAllStockStub } = makeSut();
    const loadAllStockSpy = jest.spyOn(loadAllStockStub, "loadAll");
    const fakeRequest = makeFakeRequest();
    await sut.handle(fakeRequest);
    expect(loadAllStockSpy).toHaveBeenCalled();
  });

  test("Should return 500 if LoadStock throws", async () => {
    const { sut, loadAllStockStub } = makeSut();
    jest
      .spyOn(loadAllStockStub, "loadAll")
      .mockReturnValueOnce(
        new Promise((resolve, reject) => reject(new Error()) as any)
      );
    const fakeRequest = makeFakeRequest();
    const httpResponse = await sut.handle(fakeRequest);
    expect(httpResponse).toEqual(serverError(new Error()));
  });

  test("Should load a Stock list and return 200 on sucess", async () => {
    const { sut } = makeSut();
    const httpResponse = await sut.handle(makeFakeRequest());
    expect(httpResponse).toEqual(ok(makeFakeStockList()));
  });
});
