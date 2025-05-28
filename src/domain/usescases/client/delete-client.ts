export interface DeleteClientById {
  delete(id: number): Promise<string>;
}
