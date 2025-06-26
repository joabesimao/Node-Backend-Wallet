import { AddPositionRepository } from "../../../../data/protocols/db/position/add-position";
import { DeletePositionRepository } from "../../../../data/protocols/db/position/delete-position";
import { LoadAllPositionRepository } from "../../../../data/protocols/db/position/load-all-position";
import { LoadOnePositionRepository } from "../../../../data/protocols/db/position/load-one-position";
import { UpdatePositionRepository } from "../../../../data/protocols/db/position/update-position";
import { Position } from "../../../../domain/models/position-model/position";
import { AddPositionModel } from "../../../../domain/usescases/position/add-position";
import { prisma } from "../helper";

export class PositionRepository
  implements
    AddPositionRepository,
    LoadAllPositionRepository,
    LoadOnePositionRepository,
    UpdatePositionRepository,
    DeletePositionRepository
{
  async add(position: AddPositionModel): Promise<Position> {
    const addOnePosition = await prisma.position.create({
      data: {
        stock: {
          connect: {
            id: position.stock.id,
          },
        },
        quantity: position.quantity,
        Wallet: {
          connect: {
            id: 1,
          },
        },
      },
    });
    return addOnePosition as unknown as Position;
  }

  async loadAll(): Promise<Position[]> {
    const loadAllPosition = await prisma.position.findMany({
      include: {
        stock: true,
      },
    });
    return loadAllPosition;
  }

  async loadOne(id: number): Promise<Position> {
    const loadOnePosition = await prisma.position.findUnique({
      where: {
        id: Number(id),
      },
    });
    return loadOnePosition as unknown as Position;
  }

  async update(id: number, info: Partial<Position>): Promise<Position> {
    const updatePosition = await prisma.position.update({
      where: {
        id: Number(id),
      },
      data: {},
    });
    return updatePosition as unknown as Position;
  }
  async delete(id: number): Promise<string> {
    await prisma.position.delete({
      where: {
        id: Number(id),
      },
    });
    return "Position Deletado com Sucesso!";
  }
}
