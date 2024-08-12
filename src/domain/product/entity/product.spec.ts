import Product from "./product";

describe("Product unit test suite", () => {
  it("should throw error when id is empty", () => {
    expect(() => {
      new Product("", "Product 1", 100);
    }).toThrow("product: Id is required");
  });

  it("should throw error when name is empty", () => {
    expect(() => {
      new Product("123", "", 100);
    }).toThrow("product: Name is required");
  });

  it("should throw error when id and name are empty", () => {
    expect(() => {
      new Product("", "", 100);
    }).toThrow("product: Id is required,product: Name is required");
  });

  it("should throw error when price is less than 0", () => {
    expect(() => {
      new Product("123", "Name", -1);
    }).toThrow("product: Price must be greater than 0");
  });

  it("should change name", () => {
    const product = new Product("123", "Name", 100);
    product.changeName("New Name");
    expect(product.name).toBe("New Name");
  });

  it("should change price", () => {
    const product = new Product("123", "Name", 100);
    product.changePrice(200);
    expect(product.price).toBe(200);
  });
});
