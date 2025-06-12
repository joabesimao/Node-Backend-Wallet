import { LogRepository } from "../../../../data/protocols/db/log-error/log-error-repository";
import { prisma } from "../helper";

export class LogErroRepository implements LogRepository {
  async log(stack: string): Promise<void> {
    await prisma.logError.create({
      data: { stack: stack, date: new Date() },
    });
  }
}
