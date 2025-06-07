import { AddPositionController } from "./add-position-controller";
import {
  AddPosition,
  AddPositionModel,
} from "../../../../domain/usescases/position/add-position";
import { HttpRequest } from "../../../protocols/http/http";
import { ok, serverError } from "../../../helpers/http/http-helper";
import { Position } from "../../../../domain/models/position-model/position";

const makeFakeClient = (): Position => ({
  id: 1,
  quantity: 10,
  stock: {
    id: 1,
    name: "any_name",
    valueStock: 20,
  },
});

const makeFakeRequest = (): HttpRequest => ({
  body: {
    quantity: 10,
    stock: {
      id: 1,
      name: "any_name",
      valueStock: 20,
    },
  },
});

interface SutTypes {
  sut: AddPositionController;
  addPositionStub: AddPosition;
}
const makeAddPositionStub = (): AddPosition => {
  class AddPositionStub implements AddPosition {
    async add(position: AddPositionModel): Promise<Position> {
      return new Promise((resolve) => resolve(makeFakeClient()));
    }
  }
  return new AddPositionStub();
};

const makeSut = (): SutTypes => {
  const addPositionStub = makeAddPositionStub();
  const sut = new AddPositionController(addPositionStub);
  return {
    sut,
    addPositionStub,
  };
};

describe("AddPosition Controller", () => {
  test("Should call AddPosition with correct values", async () => {
    const { sut, addPositionStub } = makeSut();
    const addClientSpy = jest.spyOn(addPositionStub, "add");
    const fakeRequest = makeFakeRequest();
    await sut.handle(fakeRequest);
    expect(addClientSpy).toHaveBeenCalledWith({
      quantity: 10,
      stock: {
        id: 1,
        name: "any_name",
        valueStock: 20,
      },
    });
  });

  test("Should return 500 if AddPosition throws", async () => {
    const { sut, addPositionStub } = makeSut();
    jest
      .spyOn(addPositionStub, "add")
      .mockReturnValueOnce(
        new Promise((resolve, reject) => reject(new Error()) as any)
      );
    const fakeRequest = makeFakeRequest();
    const httpResponse = await sut.handle(fakeRequest);
    expect(httpResponse).toEqual(serverError(new Error()));
  });

  test("Should add a Position and return  200 on sucess", async () => {
    const { sut } = makeSut();
    const httpResponse = await sut.handle(makeFakeRequest());
    expect(httpResponse).toEqual(ok(makeFakeClient()));
  });
});
