import { v4 as uuid } from "uuid";
import OrderFactory, { OrderFactoryProps } from "./order.factory";

describe("Order Factory unit tests", () => {
  it("should create an order", () => {
    const orderProps: OrderFactoryProps = {
      id: uuid(),
      customerId: uuid(),
      items: [
        {
          id: uuid(),
          name: "Product 1",
          productId: uuid(),
          quantity: 1,
          price: 100,
        },
      ],
    };

    const order = OrderFactory.create(orderProps);

    expect(order.id).toBe(orderProps.id);
    expect(order.customerId).toBe(orderProps.customerId);
    expect(order.items).toHaveLength(1);
  });
});
