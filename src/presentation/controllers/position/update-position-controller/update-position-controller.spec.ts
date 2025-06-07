import { UpdatePositionController } from "./update-position-controller";
import { UpdatePosition } from "../../../../domain/usescases/position/update-position";
import { HttpRequest } from "../../../protocols/http/http";
import { ok, serverError } from "../../../helpers/http/http-helper";
import { Position } from "../../../../domain/models/position-model/position";

const makeFakePosition = (): Position => ({
  id: 7,
  quantity: 10,
  stock: {
    id: 1,
    name: "any_name",
    valueStock: 200,
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
  params: {
    id: 8,
  },
});

interface SutTypes {
  sut: UpdatePositionController;
  updatePositionStub: UpdatePosition;
}
const makeUpdatePositionStub = (): UpdatePosition => {
  class UpdatePositionStub implements UpdatePosition {
    async update(id: number, info: Partial<Position>): Promise<Position> {
      return new Promise((resolve) => resolve(makeFakePosition()));
    }
  }

  return new UpdatePositionStub();
};

const makeSut = (): SutTypes => {
  const updatePositionStub = makeUpdatePositionStub();
  const sut = new UpdatePositionController(updatePositionStub);
  return {
    sut,
    updatePositionStub,
  };
};

describe("UpdatePosition Controller", () => {
  test("Should call UpdatePosition with correct values", async () => {
    const { sut, updatePositionStub } = makeSut();
    const loadAllPositionSpy = jest.spyOn(updatePositionStub, "update");
    const fakeRequest = makeFakeRequest();
    await sut.handle(fakeRequest);
    expect(loadAllPositionSpy).toHaveBeenCalledWith(8, {
      quantity: 10,
      stock: {
        id: 1,
        name: "any_name",
        valueStock: 20,
      },
    });
  });

  test("Should return 500 if UpdatePosition throws", async () => {
    const { sut, updatePositionStub } = makeSut();
    jest
      .spyOn(updatePositionStub, "update")
      .mockReturnValueOnce(
        new Promise((resolve, reject) => reject(new Error()) as any)
      );
    const fakeRequest = makeFakeRequest();
    const httpResponse = await sut.handle(fakeRequest);
    expect(httpResponse).toEqual(serverError(new Error()));
  });

  test("Should UpdatePosition and return  200 on sucess", async () => {
    const { sut } = makeSut();
    const httpResponse = await sut.handle(makeFakeRequest());
    expect(httpResponse).toEqual(ok(makeFakePosition()));
  });
});
