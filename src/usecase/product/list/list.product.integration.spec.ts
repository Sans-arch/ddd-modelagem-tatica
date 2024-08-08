import { Sequelize } from "sequelize-typescript";
import ProductModel from "../../../infra/product/repository/sequelize/product.model";
import ProductRepository from "../../../infra/product/repository/sequelize/product.repository";
import ProductA from "../../../domain/product/entity/product";
import ListProductUseCase from "./list.product.usecase";

describe("Test list product integration use case", () => {
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

  it("should list all products", async () => {
    const productRepository = new ProductRepository();
    const usecase = new ListProductUseCase(productRepository);
    const product1 = new ProductA("123", "John", 40.0);
    const product2 = new ProductA("1234", "Jane", 72.0);
    await productRepository.create(product1);
    await productRepository.create(product2);

    const input = {};
    const output = await usecase.execute(input);

    expect(output.products.length).toBe(2);
    expect(output.products[0].id).toBe(product1.id);
    expect(output.products[0].name).toBe(product1.name);
    expect(output.products[0].price).toBe(product1.price);

    expect(output.products[1].id).toBe(product2.id);
    expect(output.products[1].name).toBe(product2.name);
    expect(output.products[1].price).toBe(product2.price);
  });
});
