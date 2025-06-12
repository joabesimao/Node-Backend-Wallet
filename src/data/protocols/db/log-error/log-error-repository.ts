export interface LogRepository {
  log(stack: string): Promise<void>;
}
