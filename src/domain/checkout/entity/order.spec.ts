import Order from "./order";
import OrderItem from "./order_item";

describe("Order test suite", () => {
  it("should throw error when id is empty", () => {
    expect(() => {
      new Order("", "123", []);
    }).toThrow("Id is required");
  });

  it("should throw error when customerId is empty", () => {
    expect(() => {
      new Order("123", "", []);
    }).toThrow("Customer Id is required");
  });

  it("should throw error when item qtd is empty", () => {
    expect(() => {
      new Order("123", "123", []);
    }).toThrow("Items are required");
  });

  it("should change items", () => {
    const item1 = new OrderItem("1", "Item 1", 100, "p1", 2);
    const item2 = new OrderItem("2", "Item 2", 200, "p2", 7);
    const order = new Order("o1", "c1", [item1]);

    expect(order.items).toHaveLength(1);
    expect(order.items).toContainEqual(item1);
    expect(order.items).not.toContainEqual(item2);
    expect(order.total()).toBe(200);

    order.changeItems([item1, item2]);

    expect(order.items).toHaveLength(2);
    expect(order.items).toContainEqual(item1);
    expect(order.items).toContainEqual(item2);
    expect(order.total()).toBe(1600);
  });

  it("should calculate total", () => {
    const item = new OrderItem("1", "Item 1", 100, "p1", 2);
    const item2 = new OrderItem("2", "Item 2", 200, "p2", 2);
    const order = new Order("o1", "c1", [item]);

    let total = order.total();

    expect(total).toBe(200);

    const order2 = new Order("o1", "c1", [item, item2]);
    total = order2.total();

    expect(total).toBe(600);
  });

  it("should throw error when item qtd is less or equal 0", () => {
    expect(() => {
      const item = new OrderItem("1", "Item 1", 100, "p1", 0);
      new Order("o1", "c1", [item]);
    }).toThrow("Quantity must be greater than 0");
  });
});
