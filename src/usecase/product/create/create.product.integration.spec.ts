import { Sequelize } from "sequelize-typescript";
import ProductModel from "../../../infra/product/repository/sequelize/product.model";
import ProductRepository from "../../../infra/product/repository/sequelize/product.repository";
import CreateProductUseCase from "./create.product.usecase";

describe("Test create product use case", () => {
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

  it("should create a product", async () => {
    const productRepository = new ProductRepository();
    const usecase = new CreateProductUseCase(productRepository);

    const input = {
      name: "John",
      price: 40.0,
      type: "a",
    };

    const output = await usecase.execute(input);

    expect(output.name).toEqual(input.name);
    expect(output.price).toEqual(input.price);
  });

  it("should create a product of type B", async () => {
    const productRepository = new ProductRepository();
    const usecase = new CreateProductUseCase(productRepository);

    const input = {
      name: "John",
      price: 40.0,
      type: "b",
    };

    const output = await usecase.execute(input);

    expect(output.name).toEqual(input.name);
    expect(output.price).toEqual(80.0);
  });
});
