import { Sequelize } from "sequelize-typescript";
import ProductModel from "../../../infra/product/repository/sequelize/product.model";
import ProductRepository from "../../../infra/product/repository/sequelize/product.repository";
import FindProductUsecase from "./find.product.usecase";
import { InputFindProductDto, OutputFindProductDto } from "./find.product.dto";
import ProductA from "../../../domain/product/entity/product";

describe("Test find product use case", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: {
        force: true,
      },
    });

    sequelize.addModels([ProductModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should find a product", async () => {
    const productRepository = new ProductRepository();
    const usecase = new FindProductUsecase(productRepository);
    const productA = new ProductA("123", "John", 40.0);
    await productRepository.create(productA);

    const input: InputFindProductDto = {
      id: "123",
    };

    const output: OutputFindProductDto = {
      id: "123",
      name: "John",
      price: 40.0,
    };

    const result = await usecase.execute(input);

    expect(result).toEqual(output);
  });
});
