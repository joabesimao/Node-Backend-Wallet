export interface DeleteWalletRepository {
  delete(id: number): Promise<string>;
}
