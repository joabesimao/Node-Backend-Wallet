import { LoadAllPositionController } from "./load-all-position-controller";
import { LoadAllPosition } from "../../../../domain/usescases/position/load-position";
import { HttpRequest } from "../../../protocols/http/http";
import { ok, serverError } from "../../../helpers/http/http-helper";
import { Position } from "../../../../domain/models/position-model/position";

const makeFakePositionList = (): Position[] => [
  {
    id: 1,
    quantity: 10,
    stock: {
      id: 1,
      name: "any_name",
      valueStock: 20,
    },
  },
  {
    id: 10,
    quantity: 15,
    stock: {
      id: 2,
      name: "other_name",
      valueStock: 200,
    },
  },
];

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
  sut: LoadAllPositionController;
  loadAllPositionStub: LoadAllPosition;
}
const makeLoadAllPositionStub = (): LoadAllPosition => {
  class LoadAllPositionStub implements LoadAllPosition {
    async loadAll(): Promise<Position[]> {
      return new Promise((resolve) => resolve(makeFakePositionList()));
    }
  }
  return new LoadAllPositionStub();
};

const makeSut = (): SutTypes => {
  const loadAllPositionStub = makeLoadAllPositionStub();
  const sut = new LoadAllPositionController(loadAllPositionStub);
  return {
    sut,
    loadAllPositionStub,
  };
};

describe("LoadAllPosition Controller", () => {
  test("Should call LoadAllPosition with correct values", async () => {
    const { sut, loadAllPositionStub } = makeSut();
    const loadAllPositionSpy = jest.spyOn(loadAllPositionStub, "loadAll");
    const fakeRequest = makeFakeRequest();
    await sut.handle(fakeRequest);
    expect(loadAllPositionSpy).toHaveBeenCalled();
  });

  test("Should return 500 if LoadAllPosition throws", async () => {
    const { sut, loadAllPositionStub } = makeSut();
    jest
      .spyOn(loadAllPositionStub, "loadAll")
      .mockReturnValueOnce(
        new Promise((resolve, reject) => reject(new Error()) as any)
      );
    const fakeRequest = makeFakeRequest();
    const httpResponse = await sut.handle(fakeRequest);
    expect(httpResponse).toEqual(serverError(new Error()));
  });

  test("Should load all Position list and return  200 on sucess", async () => {
    const { sut } = makeSut();
    const httpResponse = await sut.handle(makeFakeRequest());
    expect(httpResponse).toEqual(ok(makeFakePositionList()));
  });
});
