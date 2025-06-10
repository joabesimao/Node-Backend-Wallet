import { AddStockController } from "./add-stock-controller";
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
  sut: AddStockController;
  addStockStub: AddStock;
}
const makeAddStockStub = (): AddStock => {
  class AddStockStub implements AddStock {
    async add(stock: AddStockModel): Promise<Stock> {
      return new Promise((resolve) => resolve(makeFakeStock()));
    }
  }
  return new AddStockStub();
};

const makeSut = (): SutTypes => {
  const addStockStub = makeAddStockStub();
  const sut = new AddStockController(addStockStub);
  return {
    sut,
    addStockStub,
  };
};

describe("AddStock Controller", () => {
  test("Should call AddStock with correct values", async () => {
    const { sut, addStockStub } = makeSut();
    const addStockSpy = jest.spyOn(addStockStub, "add");
    const fakeRequest = makeFakeRequest();
    await sut.handle(fakeRequest);
    expect(addStockSpy).toHaveBeenCalledWith(makeFakeStockModel());
  });

  test("Should return 500 if AddStock throws", async () => {
    const { sut, addStockStub } = makeSut();
    jest
      .spyOn(addStockStub, "add")
      .mockReturnValueOnce(
        new Promise((resolve, reject) => reject(new Error()) as any)
      );
    const fakeRequest = makeFakeRequest();
    const httpResponse = await sut.handle(fakeRequest);
    expect(httpResponse).toEqual(serverError(new Error()));
  });

  test("Should add a Stock and return 200 on sucess", async () => {
    const { sut } = makeSut();
    const httpResponse = await sut.handle(makeFakeRequest());
    expect(httpResponse).toEqual(ok(makeFakeStock()));
  });
});
