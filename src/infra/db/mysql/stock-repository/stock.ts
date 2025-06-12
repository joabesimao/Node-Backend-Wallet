import { AddStockRepository } from "../../../../data/protocols/db/stock/add-stock";
import { DeleteStockRepository } from "../../../../data/protocols/db/stock/delete-stock";
import { LoadAllStockRepository } from "../../../../data/protocols/db/stock/load-all-stock";
import { LoadOneStockRepository } from "../../../../data/protocols/db/stock/load-one-stock";
import { UpdateStockRepository } from "../../../../data/protocols/db/stock/update-stock";
import { Stock } from "../../../../domain/models/stock-model/stock";
import { AddStockModel } from "../../../../domain/usescases/stock/add-stock";
import { prisma } from "../helper";

export class StockRepository
  implements
    AddStockRepository,
    LoadAllStockRepository,
    LoadOneStockRepository,
    UpdateStockRepository,
    DeleteStockRepository
{
  async add(stock: AddStockModel): Promise<Stock> {
    const addStock = await prisma.stock.create({
      data: {
        name: stock.stock.name,
        valueStock: stock.stock.valueStock,
      },
    });
    return addStock;
  }

  async loadAll(): Promise<Stock[]> {
    const loadAllStock = await prisma.stock.findMany({
      include: {
        Position: true,
      },
    });
    return loadAllStock;
  }

  async loadOne(id: number): Promise<Stock> {
    const loadOneStock = await prisma.stock.findUnique({
      where: {
        id: id,
      },
    });
    return loadOneStock;
  }

  async update(id: number, info: Partial<Stock>): Promise<Stock> {
    const updateStock = await prisma.stock.update({
      data: {
        ...info,
      },
      where: {
        id: id,
      },
    });
    return updateStock;
  }

  async delete(id: number): Promise<string> {
    const deleteStock = await prisma.stock.delete({
      where: {
        id: id,
      },
    });
    return deleteStock as unknown as string;
  }
}
