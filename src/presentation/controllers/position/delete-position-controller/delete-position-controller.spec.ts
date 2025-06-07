import { DeletePositionController } from "./delete-position-controller";
import { DeletePositionById } from "../../../../domain/usescases/position/delete-position";
import { LoadPositionById } from "../../../../domain/usescases/position/load-position";
import { HttpRequest } from "../../../protocols/http/http";
import { ok, serverError } from "../../../helpers/http/http-helper";
import { Position } from "../../../../domain/models/position-model/position";

const makeFakeRequest = (): HttpRequest => ({
  body: {
    quantity: 10,
    stock: {
      id: 1,
      name: "any_name",
      valueStock: 20,
    },
  },
  params: {
    id: 8,
  },
});

interface SutTypes {
  sut: DeletePositionController;
  deletePositionStub: DeletePositionById;
}
const makeDeletePositionStub = (): DeletePositionById => {
  class DeletePositionStub implements DeletePositionById {
    async deleteById(id: number): Promise<string> {
      return new Promise((resolve) => resolve("Deletado com Sucesso!"));
    }
  }
  return new DeletePositionStub();
};

const makeSut = (): SutTypes => {
  const deletePositionStub = makeDeletePositionStub();
  const sut = new DeletePositionController(deletePositionStub);
  return {
    sut,
    deletePositionStub,
  };
};

describe("DeletePosition Controller", () => {
  test("Should call DeletePosition with correct values", async () => {
    const { sut, deletePositionStub } = makeSut();
    const loadAllPositionSpy = jest.spyOn(deletePositionStub, "deleteById");
    const fakeRequest = makeFakeRequest();
    await sut.handle(fakeRequest);
    expect(loadAllPositionSpy).toHaveBeenCalledWith(8);
  });

  test("Should return 500 if DeletePosition throws", async () => {
    const { sut, deletePositionStub } = makeSut();
    jest
      .spyOn(deletePositionStub, "deleteById")
      .mockReturnValueOnce(
        new Promise((resolve, reject) => reject(new Error()) as any)
      );
    const fakeRequest = makeFakeRequest();
    const httpResponse = await sut.handle(fakeRequest);
    expect(httpResponse).toEqual(serverError(new Error()));
  });

  test("Should return a message and return  200 on sucess", async () => {
    const { sut } = makeSut();
    const httpResponse = await sut.handle(makeFakeRequest());
    expect(httpResponse).toEqual(ok("Deletado com Sucesso!"));
  });
});
