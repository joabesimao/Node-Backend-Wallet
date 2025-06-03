export interface DeletePositionRepository {
  delete(id: number): Promise<string>;
}
