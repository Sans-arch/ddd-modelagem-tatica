import { Sequelize } from "sequelize-typescript";
import ProductModel from "../../../infra/product/repository/sequelize/product.model";
import ProductRepository from "../../../infra/product/repository/sequelize/product.repository";
import UpdateProductUsecase from "./update.product.usecase";
import ProductFactory from "../../../domain/product/factory/product.factory";
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

  it("should update a product", async () => {
    const productRepository = new ProductRepository();
    const usecase = new UpdateProductUsecase(productRepository);

    const product = new ProductA("123", "John", 40.0);
    productRepository.create(product);

    const input = {
      id: product.id,
      name: "Product A Updated",
      price: 41.0,
    };

    const output = await usecase.execute(input);

    expect(output).toEqual(input);
    expect(product.name).not.toBe("Product A Updated");
    expect(output.name).toBe("Product A Updated");
    expect(product.price).not.toBe(41.0);
    expect(output.price).toBe(41.0);
  });
});
