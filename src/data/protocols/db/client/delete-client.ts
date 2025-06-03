export interface DeleteClientRepository {
  delete(id: number): Promise<string>;
}
