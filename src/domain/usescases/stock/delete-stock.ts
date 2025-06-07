export interface DeleteStock {
  delete(id: number): Promise<string>;
}
