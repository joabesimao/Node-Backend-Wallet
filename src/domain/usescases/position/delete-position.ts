export interface DeletePositionById {
  deleteById(id: number): Promise<string>;
}
