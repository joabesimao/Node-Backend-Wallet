export interface ApiGateway {
  getStock(symbol: string): Promise<{
    symbol: string;
    price: number;
    date: string;
  }>;
}
