import { LoadOnePositionController } from "./load-one-position-controller";
import { LoadPositionById } from "../../../../domain/usescases/position/load-position";
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
  sut: LoadOnePositionController;
  loadOnePositionStub: LoadPositionById;
}
const makeLoadOnePositionStub = (): LoadPositionById => {
  class LoadOnePositionStub implements LoadPositionById {
    async loadById(id: number): Promise<Position> {
      return new Promise((resolve) => resolve(makeFakePosition()));
    }
  }
  return new LoadOnePositionStub();
};

const makeSut = (): SutTypes => {
  const loadOnePositionStub = makeLoadOnePositionStub();
  const sut = new LoadOnePositionController(loadOnePositionStub);
  return {
    sut,
    loadOnePositionStub,
  };
};

describe("LoadOnePosition Controller", () => {
  test("Should call LoadOnePosition with correct values", async () => {
    const { sut, loadOnePositionStub } = makeSut();
    const loadAllPositionSpy = jest.spyOn(loadOnePositionStub, "loadById");
    const fakeRequest = makeFakeRequest();
    await sut.handle(fakeRequest);
    expect(loadAllPositionSpy).toHaveBeenCalledWith(8);
  });

  test("Should return 500 if LoadOnePosition throws", async () => {
    const { sut, loadOnePositionStub } = makeSut();
    jest
      .spyOn(loadOnePositionStub, "loadById")
      .mockReturnValueOnce(
        new Promise((resolve, reject) => reject(new Error()) as any)
      );
    const fakeRequest = makeFakeRequest();
    const httpResponse = await sut.handle(fakeRequest);
    expect(httpResponse).toEqual(serverError(new Error()));
  });

  test("Should return one Position and return  200 on sucess", async () => {
    const { sut } = makeSut();
    const httpResponse = await sut.handle(makeFakeRequest());
    expect(httpResponse).toEqual(ok(makeFakePosition()));
  });
});
