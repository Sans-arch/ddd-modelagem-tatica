import CreateCustomerUseCase from "./create.customer.usecase";

describe("Unit test create customer use case", () => {
  const input = {
    name: "John",
    address: {
      street: "Street",
      number: 123,
      zip: "Zip",
      city: "City",
    },
  };

  const MockRepository = () => {
    return {
      create: jest.fn(),
      find: jest.fn(),
      findAll: jest.fn(),
      update: jest.fn(),
    };
  };

  it("should create a customer", async () => {
    const customerRepository = MockRepository();
    const customerCreateUseCase = new CreateCustomerUseCase(customerRepository);

    const output = await customerCreateUseCase.execute(input);

    expect(output).toEqual({
      id: expect.any(String),
      name: input.name,
      address: {
        street: input.address.street,
        number: input.address.number,
        zip: input.address.zip,
        city: input.address.city,
      },
    });
  });
});
