import { DeleteStockController } from "./delete-stock-controller";
import { DeleteStock } from "../../../../domain/usescases/stock/delete-stock";
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
  sut: DeleteStockController;
  deleteStockStub: DeleteStock;
}
const makeDeleteStockStub = (): DeleteStock => {
  class DeleteStockStub implements DeleteStock {
    async delete(id: number): Promise<string> {
      return new Promise((resolve) => resolve("Deletado com Sucesso!"));
    }
  }
  return new DeleteStockStub();
};

const makeSut = (): SutTypes => {
  const deleteStockStub = makeDeleteStockStub();
  const sut = new DeleteStockController(deleteStockStub);
  return {
    sut,
    deleteStockStub,
  };
};

describe("DeleteStock Controller", () => {
  test("Should call DeleteStock with correct values", async () => {
    const { sut, deleteStockStub } = makeSut();
    const deleteStockSpy = jest.spyOn(deleteStockStub, "delete");
    const fakeRequest = makeFakeRequest();
    await sut.handle(fakeRequest);
    expect(deleteStockSpy).toHaveBeenCalledWith(1);
  });

  test("Should return 500 if DeleteStock throws", async () => {
    const { sut, deleteStockStub } = makeSut();
    jest
      .spyOn(deleteStockStub, "delete")
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
    expect(httpResponse).toEqual(ok("Deletado com Sucesso!"));
  });
});
