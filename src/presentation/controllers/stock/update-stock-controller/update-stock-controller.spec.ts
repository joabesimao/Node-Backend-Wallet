import { UpdateStockController } from "./update-stock-controller";
import { UpdateStock } from "../../../../domain/usescases/stock/update-stock";
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
});

interface SutTypes {
  sut: UpdateStockController;
  updateStockStub: UpdateStock;
}
const makeUpdateStockStub = (): UpdateStock => {
  class UpdateStockStub implements UpdateStock {
    async update(id: number, info: Partial<Stock>): Promise<Stock> {
      return new Promise((resolve) => resolve(makeFakeStock()));
    }
  }
  return new UpdateStockStub();
};

const makeSut = (): SutTypes => {
  const updateStockStub = makeUpdateStockStub();
  const sut = new UpdateStockController(updateStockStub);
  return {
    sut,
    updateStockStub,
  };
};

describe("UpdateStock Controller", () => {
  test("Should call UpdateStock with correct values", async () => {
    const { sut, updateStockStub } = makeSut();
    const loadAllStockSpy = jest.spyOn(updateStockStub, "update");
    const fakeRequest = makeFakeRequest();
    await sut.handle(fakeRequest);
    expect(loadAllStockSpy).toHaveBeenCalledWith(1, {
      name: "any_name",
    });
  });

  test("Should return 500 if UpdateStock throws", async () => {
    const { sut, updateStockStub } = makeSut();
    jest
      .spyOn(updateStockStub, "update")
      .mockReturnValueOnce(
        new Promise((resolve, reject) => reject(new Error()) as any)
      );
    const fakeRequest = makeFakeRequest();
    const httpResponse = await sut.handle(fakeRequest);
    expect(httpResponse).toEqual(serverError(new Error()));
  });

  test("Should update a Stock and return 200 on sucess", async () => {
    const { sut } = makeSut();
    const httpResponse = await sut.handle(makeFakeRequest());
    expect(httpResponse).toEqual(ok(makeFakeStock()));
  });
});
