import { DbDeletePosition } from "./db-delete-position";
import { DeletePositionRepository } from "../../../protocols/db/position/delete-position";

interface SutTypes {
  sut: DbDeletePosition;
  deletePositionRepositoryStub: DeletePositionRepository;
}

const makePositionRepository = (): DeletePositionRepository => {
  class DeletePositionRepositoryStub implements DeletePositionRepository {
    async delete(id: number): Promise<string> {
      return new Promise((resolve) =>
        resolve("Position Deletado com Sucesso!")
      );
    }
  }
  return new DeletePositionRepositoryStub();
};

const makeSut = (): SutTypes => {
  const deletePositionRepositoryStub = makePositionRepository();
  const sut = new DbDeletePosition(deletePositionRepositoryStub);
  return {
    sut,
    deletePositionRepositoryStub,
  };
};

describe("DbDeletePosition Usecase", () => {
  const id = 7;
  test("Should call DeletePositionRepository with correct values", async () => {
    const { sut, deletePositionRepositoryStub } = makeSut();
    const deletedSpy = jest.spyOn(deletePositionRepositoryStub, "delete");
    await sut.deleteById(id);
    expect(deletedSpy).toHaveBeenCalledWith(7);
  });

  test("Should throw if DeletePositionRepository throws", async () => {
    const { sut, deletePositionRepositoryStub } = makeSut();
    jest
      .spyOn(deletePositionRepositoryStub, "delete")
      .mockReturnValueOnce(
        new Promise((resolve, reject) => reject(new Error("")))
      );

    const promise = sut.deleteById(id);
    await expect(promise).rejects.toThrow();
  });

  test("Should return a mensage if position deleted on success", async () => {
    const { sut } = makeSut();
    const client = await sut.deleteById(id);
    expect(client).toEqual("Position Deletado com Sucesso!");
  });
});
