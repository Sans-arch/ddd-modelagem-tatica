import ProductFactory from "../../../domain/product/factory/product.factory";
import FindProductUsecase from "./find.product.usecase";

describe("Unit test find product use case", () => {
  const productA = ProductFactory.create("a", "Product A", 17.5);
  const productB = ProductFactory.create("b", "Product B", 40.0);

  const MockRepository = () => {
    return {
      create: jest.fn(),
      findAll: jest.fn(),
      update: jest.fn(),
      find: jest.fn().mockReturnValue(Promise.resolve(productA)),
    };
  };

  it("should find a product of type A", async () => {
    const productRepository = MockRepository();

    const usecase = new FindProductUsecase(productRepository);
    const input = { id: productA.id };

    const output = await usecase.execute(input);

    expect(output).toEqual({
      id: input.id,
      name: productA.name,
      price: productA.price,
    });
  });

  it("should find a product of type B", async () => {
    const productRepository = MockRepository();

    productRepository.find.mockReturnValueOnce(Promise.resolve(productB));

    const usecase = new FindProductUsecase(productRepository);
    const input = { id: productB.id };

    const output = await usecase.execute(input);

    expect(output).toEqual({
      id: input.id,
      name: productB.name,
      price: 80.0,
    });
  });
});
