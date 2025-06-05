import { InvalidParamError } from "../../errors";
import { Validation } from "../../../presentation/protocols/validation/validation";

export class CompareFieldsValidation implements Validation {
  constructor(
    private readonly field: string,
    private readonly fieldToCompare: string
  ) {}
  validate(input: any): Error {
    if (input[this.field] !== input[this.fieldToCompare]) {
      return new InvalidParamError(this.fieldToCompare);
    }
  }
}
