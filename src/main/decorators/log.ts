import { Controller } from "../../presentation/protocols/controller/controller";
import {
  HttpRequest,
  HttpResponse,
} from "../../presentation/protocols/http/http";
import { LogErroRepository } from "../../infra/db/mysql/log-error-repository/log-error-repository";

export class LogControllerDecorator implements Controller {
  constructor(
    private readonly controller: Controller,
    private readonly logErrorRepository: LogErroRepository
  ) {}
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    const result = await this.controller.handle(httpRequest);
    if (result.statusCode === 500) {
      await this.logErrorRepository.log(result.body.stack);
    }
    return result;
  }
}
