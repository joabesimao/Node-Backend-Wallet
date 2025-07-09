import axios from "axios";
import { marketStackURLAndKey } from "../../infra/db/mysql/helper/index";
import { ApiGateway } from "../../domain/models/gateways/stock-api-gateway";

export class marketStackApi implements ApiGateway {
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
}
