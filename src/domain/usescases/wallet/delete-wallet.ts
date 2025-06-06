export interface DeleteWalletById {
  deleteById(id: number): Promise<string>;
}
