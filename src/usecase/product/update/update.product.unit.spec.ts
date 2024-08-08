import ProductFactory from "../../../domain/product/factory/product.factory";
import UpdateProductUsecase from "./update.product.usecase";

describe("Unit test update product use case", () => {
  const product = ProductFactory.create("a", "Product A", 17.5);

  const input = {
    id: product.id,
    name: "Product A Updated",
    price: 41.0,
  };

  const MockRepository = () => {
    return {
      create: jest.fn(),
      findAll: jest.fn(),
      find: jest.fn().mockReturnValue(Promise.resolve(product)),
      update: jest.fn(),
    };
  };

  it("should update a product", async () => {
    const productRepository = MockRepository();
    const usecase = new UpdateProductUsecase(productRepository);

    const output = await usecase.execute(input);

    expect(output).toEqual(input);
  });
});
