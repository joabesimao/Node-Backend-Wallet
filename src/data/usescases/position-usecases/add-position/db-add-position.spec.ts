import { DbAddPosition } from "./db-add-position";
import { AddPositionRepository } from "../../../protocols/db/position/add-position";
import { AddPositionModel } from "../../../../domain/usescases/position/add-position";
import { Position } from "../../../../domain/models/position-model/position";

interface SutTypes {
  sut: DbAddPosition;
  addPositionRepositoryStub: AddPositionRepository;
}

const makeAddPosition = (): AddPositionModel => ({
  position: {
    quantity: 1,
    stock: {
      id: 1,
      name: "any_name",
      valueStock: 10,
    },
  },
});

const makePosition = (): Position => ({
  id: 1,
  quantity: 1,
  stock: {
    id: 1,
    name: "any_name",
    valueStock: 10,
  },
});

const makePositionRepository = (): AddPositionRepository => {
  class AddPositionRepositoryStub implements AddPositionRepository {
    async add(position: AddPositionModel): Promise<Position> {
      return new Promise((resolve) => resolve(makePosition()));
    }
  }
  return new AddPositionRepositoryStub();
};

const makeSut = (): SutTypes => {
  const addPositionRepositoryStub = makePositionRepository();
  const sut = new DbAddPosition(addPositionRepositoryStub);
  return {
    sut,
    addPositionRepositoryStub,
  };
};

describe("DbAddPosition Usecase", () => {
  test("Should call AddPositionRepository with correct values", async () => {
    const { sut, addPositionRepositoryStub } = makeSut();
    const addSpy = jest.spyOn(addPositionRepositoryStub, "add");
    await sut.add(makeAddPosition());
    expect(addSpy).toHaveBeenCalledWith({
      position: {
        quantity: 1,
        stock: {
          id: 1,
          name: "any_name",
          valueStock: 10,
        },
      },
    });
  });

  test("Should throw if addPositionRepository throws", async () => {
    const { sut, addPositionRepositoryStub } = makeSut();
    jest
      .spyOn(addPositionRepositoryStub, "add")
      .mockReturnValueOnce(
        new Promise((resolve, reject) => reject(new Error("")))
      );

    const promise = sut.add(makeAddPosition());
    await expect(promise).rejects.toThrow();
  });

  test("Should add a position on success", async () => {
    const { sut } = makeSut();
    const client = await sut.add(makeAddPosition());
    expect(client).toEqual({
      id: 1,
      quantity: 1,
      stock: {
        id: 1,
        name: "any_name",
        valueStock: 10,
      },
    });
  });
});
