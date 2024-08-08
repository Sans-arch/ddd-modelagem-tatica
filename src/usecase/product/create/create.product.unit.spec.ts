import CreateProductUseCase from "./create.product.usecase";

describe("Unit test create product use case", () => {
  const MockRepository = () => {
    return {
      create: jest.fn(),
      find: jest.fn(),
      findAll: jest.fn(),
      update: jest.fn(),
    };
  };

  it("should create a product of type A", async () => {
    const productRepository = MockRepository();
    const usecase = new CreateProductUseCase(productRepository);
    const input = {
      name: "product A",
      price: 10.5,
      type: "a",
    };

    const output = await usecase.execute(input);

    expect(output).toEqual({
      id: expect.any(String),
      name: input.name,
      price: input.price,
    });
  });

  it("should create a product of type B", async () => {
    const productRepository = MockRepository();
    const usecase = new CreateProductUseCase(productRepository);
    const input = {
      name: "product B",
      price: 16.5,
      type: "b",
    };

    const output = await usecase.execute(input);

    expect(output).toEqual({
      id: expect.any(String),
      name: input.name,
      price: input.price * 2,
    });
  });
});
