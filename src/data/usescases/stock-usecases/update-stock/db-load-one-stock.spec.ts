import { DbUpdateStock } from "./db-update-stock";
import { Stock } from "../../../../domain/models/stock-model/stock";
import { UpdateStockRepository } from "../../../protocols/db/stock/update-stock";

interface SutTypes {
  sut: DbUpdateStock;
  updateStockOneRepositoryStub: UpdateStockRepository;
}

const makeStock = (): Stock => ({ id: 1, name: "any_name", valueStock: 10 });

const makeStockRepository = (): UpdateStockRepository => {
  class updateStockRepositoryStub implements UpdateStockRepository {
    async update(id: number, info: Partial<Stock>): Promise<Stock> {
      return new Promise((resolve) => resolve(makeStock()));
    }
  }

  return new updateStockRepositoryStub();
};

const makeSut = (): SutTypes => {
  const updateStockOneRepositoryStub = makeStockRepository();
  const sut = new DbUpdateStock(updateStockOneRepositoryStub);
  return {
    sut,
    updateStockOneRepositoryStub,
  };
};

describe("DbUpdateStock Usecase", () => {
  const id = 8;
  test("Should call UpdateStockRepository with correct values", async () => {
    const { sut, updateStockOneRepositoryStub } = makeSut();
    const updateStock = jest.spyOn(updateStockOneRepositoryStub, "update");
    await sut.update(id, makeStock());
    expect(updateStock).toHaveBeenCalledWith(8, {
      id: 1,
      name: "any_name",
      valueStock: 10,
    });
  });

  test("Should update Stock on success", async () => {
    const { sut } = makeSut();
    const updateStock = await sut.update(id, makeStock());
    expect(updateStock).toEqual(makeStock());
  });

  test("Should throw if UpdateStockRepository throws", async () => {
    const { sut, updateStockOneRepositoryStub } = makeSut();
    jest
      .spyOn(updateStockOneRepositoryStub, "update")
      .mockReturnValueOnce(
        new Promise((resolve, reject) => reject(new Error("")))
      );

    const promise = sut.update(id, makeStock());
    await expect(promise).rejects.toThrow();
  });
});
