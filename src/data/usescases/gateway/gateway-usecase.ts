import { ApiGateway } from "../../../domain/models/gateways/stock-api-gateway";

export class GetStockPriceService {
  constructor(private stockApi: ApiGateway) {}

  async execute(symbol: string) {
    return this.stockApi.getStock(symbol);
  }
}
