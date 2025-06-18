import { DbDeleteStock } from "./db-delete-stock";
import { Stock } from "../../../../domain/models/stock-model/stock";
import { DeleteStockRepository } from "../../../protocols/db/stock/delete-stock";

interface SutTypes {
  sut: DbDeleteStock;
  deleteStockRepositoryStub: DeleteStockRepository;
}

const makeStockRepository = (): DeleteStockRepository => {
  class DeleteStockRepositoryStub implements DeleteStockRepository {
    async delete(id: number): Promise<string> {
      return new Promise((resolve) => resolve("Deletado com Sucesso!"));
    }
  }

  return new DeleteStockRepositoryStub();
};

const makeSut = (): SutTypes => {
  const deleteStockRepositoryStub = makeStockRepository();
  const sut = new DbDeleteStock(deleteStockRepositoryStub);
  return {
    sut,
    deleteStockRepositoryStub,
  };
};

describe("DbDeleteStock Usecase", () => {
  const id = 8;
  test("Should call DeleteStockRepository with correct values", async () => {
    const { sut, deleteStockRepositoryStub } = makeSut();
    const deleteOneStockSpy = jest.spyOn(deleteStockRepositoryStub, "delete");
    await sut.delete(id);
    expect(deleteOneStockSpy).toHaveBeenCalledWith(8);
  });

  test("Should delete one Stock on success", async () => {
    const { sut } = makeSut();
    const deleteStock = await sut.delete(id);
    expect(deleteStock).toEqual("Deletado com Sucesso!");
  });

  test("Should throw if DeleteStockRepository throws", async () => {
    const { sut, deleteStockRepositoryStub } = makeSut();
    jest
      .spyOn(deleteStockRepositoryStub, "delete")
      .mockReturnValueOnce(
        new Promise((resolve, reject) => reject(new Error("")))
      );

    const promise = sut.delete(id);
    await expect(promise).rejects.toThrow();
  });
});
