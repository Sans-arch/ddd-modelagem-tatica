import ValidatorInterface from "../../@shared/validator/validator.interface";
import ProductA from "../entity/product";
import ProductYupValidator from "../validator/product.yup.validator";

export default class ProductValidatorFactory {
  static create(): ValidatorInterface<ProductA> {
    return new ProductYupValidator();
  }
}
