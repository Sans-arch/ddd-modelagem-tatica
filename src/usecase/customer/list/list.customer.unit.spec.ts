import CustomerFactory from "../../../domain/customer/factory/customer.factory";
import Address from "../../../domain/customer/value-object/address";
import ListCustomerUseCase from "./list.customer.usecase";

describe("Unit test list customer use case", () => {
  const customer1 = CustomerFactory.createWithAddress("John Doe", new Address("Street 1", 1, "12345", "City"));
  const customer2 = CustomerFactory.createWithAddress("Jane Doe", new Address("Street 2", 2, "123456", "City 2"));

  const MockRepository = () => {
    return {
      create: jest.fn(),
      update: jest.fn(),
      find: jest.fn(),
      findAll: jest.fn().mockReturnValue(Promise.resolve([customer1, customer2])),
    };
  };

  it("should list a customer", async () => {
    const customerRepository = MockRepository();
    const usecase = new ListCustomerUseCase(customerRepository);

    const output = await usecase.execute({});

    expect(output.customers.length).toBe(2);
    expect(output.customers[0].id).toBe(customer1.id);
    expect(output.customers[0].name).toBe(customer1.name);
    expect(output.customers[0].address.street).toBe(customer1.address.street);

    expect(output.customers[1].id).toBe(customer2.id);
    expect(output.customers[1].name).toBe(customer2.name);
    expect(output.customers[1].address.street).toBe(customer2.address.street);
  });
});
