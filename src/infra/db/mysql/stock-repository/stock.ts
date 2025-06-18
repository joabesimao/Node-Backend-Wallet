import { AddStockRepository } from "../../../../data/protocols/db/stock/add-stock";
import { DeleteStockRepository } from "../../../../data/protocols/db/stock/delete-stock";
import { LoadAllStockRepository } from "../../../../data/protocols/db/stock/load-all-stock";
import { LoadOneStockRepository } from "../../../../data/protocols/db/stock/load-one-stock";
import { UpdateStockRepository } from "../../../../data/protocols/db/stock/update-stock";
import { ApiGateway } from "../../../../domain/models/gateways/stock-api-gateway";
import { Stock } from "../../../../domain/models/stock-model/stock";
import { AddStockModel } from "../../../../domain/usescases/stock/add-stock";
import { prisma, marketStackURLAndKey } from "../helper";
import axios from "axios";

export class StockRepository
  implements
    AddStockRepository,
    LoadAllStockRepository,
    LoadOneStockRepository,
    UpdateStockRepository,
    DeleteStockRepository,
    ApiGateway
{
  private readonly baseUrl = marketStackURLAndKey.url;
  private readonly apiKey = marketStackURLAndKey.key;

  async getStock(
    symbol: string
  ): Promise<{ symbol: string; price: number; date: string }> {
    const response = await axios.get(`${this.baseUrl}eod`, {
      params: {
        access_key: this.apiKey,
        symbols: symbol,
      },
    });
    const data = response.data.data?.[0];
    if (!data) throw new Error("dados nao encontrados");
    return {
      symbol: data.symbol,
      date: data.date,
      price: data.close,
    };
  }

  async add(stock: AddStockModel): Promise<Stock> {
    const list = await this.getStock(stock.name);
    const addStock = await prisma.stock.create({
      data: {
        name: list.symbol,
        valueStock: list.price,
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
        id: Number(id),
      },
    });
    return loadOneStock;
  }

  async update(id: number, info: Partial<Stock>): Promise<Stock> {
    const updateStock = await prisma.stock.update({
      where: {
        id: Number(id),
      },
      data: {
        ...info,
      },
    });
    return updateStock;
  }

  async delete(id: number): Promise<string> {
    await prisma.stock.delete({
      where: {
        id: Number(id),
      },
    });
    return "Deletado com Sucesso!";
  }
}
