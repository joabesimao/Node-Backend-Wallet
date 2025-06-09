export interface DeleteStockRepository {
  delete(id: number): Promise<string>;
}
