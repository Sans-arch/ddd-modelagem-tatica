import ProductFactory from "./product.factory";

describe("Product Factory unit tests", () => {
  it("should create a product type A", () => {
    const product = ProductFactory.create("a", "Product A", 1);

    expect(product.id).toBeDefined();
    expect(product.name).toBe("Product A");
    expect(product.price).toBe(1);
    expect(product.constructor.name).toBe("ProductA");
  });

  it("should create a product type B", () => {
    const product = ProductFactory.create("b", "Product B", 1);

    expect(product.id).toBeDefined();
    expect(product.name).toBe("Product B");
    expect(product.price).toBe(2);
    expect(product.constructor.name).toBe("ProductB");
  });

  it("should throw an error when creating an invalid product type", () => {
    expect(() => ProductFactory.create("c", "Product C", 1)).toThrow("Invalid product type");
  });
});
