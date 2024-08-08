import ProductFactory from "../../../domain/product/factory/product.factory";
import ListProductUseCase from "./list.product.usecase";

describe("Unit test list product use case", () => {
  const product1 = ProductFactory.create("a", "Product A", 17.5);
  const product2 = ProductFactory.create("b", "Product B", 41.0);

  const MockRepository = () => {
    return {
      create: jest.fn(),
      update: jest.fn(),
      find: jest.fn(),
      findAll: jest.fn().mockReturnValue(Promise.resolve([product1, product2])),
    };
  };

  it("should list products", async () => {
    const productRepository = MockRepository();
    const usecase = new ListProductUseCase(productRepository);

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
