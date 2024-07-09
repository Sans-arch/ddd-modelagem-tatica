import Address from "./address";
import Customer from "./customer";

describe("Customer test suite", () => {
  it("should throw error when id is empty", () => {
    expect(() => {
      new Customer("", "John Doe");
    }).toThrow("Id is required");
  });

  it("should throw error when name is empty", () => {
    expect(() => {
      new Customer("123", "");
    }).toThrow("Name is required");
  });

  it("should change name", () => {
    const customer = new Customer("123", "John");

    customer.changeName("Jane");

    expect(customer.name).toBe("Jane");
  });

  it("should activate customer", () => {
    const customer = new Customer("1", "John");
    const address = new Address("Street 1", 123, "13330-250", "São Paulo");
    customer.address = address;

    customer.activate();

    expect(customer.isActive()).toBe(true);
  });

  it("should throw error when address is undefined when you activate a customer", () => {
    expect(() => {
      const customer = new Customer("1", "John");
      customer.activate();
    }).toThrow("Address is mandatory to activate a customer");
  });

  it("should deactivate customer", () => {
    const customer = new Customer("1", "John");

    customer.deactivate();

    expect(customer.isActive()).toBe(false);
  });

  it("should add reward points", () => {
    const customer = new Customer("1", "Customer 1");
    expect(customer.rewardPoints).toBe(0);

    customer.addRewardPoints(10);
    expect(customer.rewardPoints).toBe(10);

    customer.addRewardPoints(10);
    expect(customer.rewardPoints).toBe(20);
  });
});
