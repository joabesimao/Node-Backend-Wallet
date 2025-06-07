import { Controller } from "../../../protocols/controller/controller";
import { HttpRequest, HttpResponse } from "../../../protocols/http/http";
import { LoadWalletById } from "../../../../domain/usescases/wallet/load-wallet";
import { ok, serverError } from "../../../helpers/http/http-helper";

export class LoadOneWalletController implements Controller {
  constructor(private readonly loadOneWalletById: LoadWalletById) {}
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const findByIdOneWallet = await this.loadOneWalletById.loadById(
        httpRequest.params.id
      );
      return ok(findByIdOneWallet);
    } catch (error) {
      return serverError(error);
    }
  }
}
