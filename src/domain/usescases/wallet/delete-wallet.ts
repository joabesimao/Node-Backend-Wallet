export interface DeleteById {
  deleteById(id: number): Promise<string>;
}
