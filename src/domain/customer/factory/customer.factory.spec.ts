import Address from "../value-object/address";
import CustomerFactory from "./customer.factory";

describe("Customer Factory unit tests", () => {
  it("should create a customer", () => {
    let customer = CustomerFactory.create("John");

    expect(customer.id).toBeDefined();
    expect(customer.name).toBe("John");
    expect(customer.rewardPoints).toBe(0);
    expect(customer.address).toBeUndefined();
  });

  it("should create a customer with an address", () => {
    const address = new Address("Rua 1", 12, "8989232", "Cidade 1");

    let customer = CustomerFactory.createWithAddress("John", address);

    expect(customer.id).toBeDefined();
    expect(customer.name).toBe("John");
    expect(customer.rewardPoints).toBe(0);
    expect(customer.address).toBeDefined();
    expect(customer.address).toBe(address);
  });

  it("should throw an error when creating a customer without a name", () => {
    expect(() => CustomerFactory.create("")).toThrow("Name is required");
  });
});
