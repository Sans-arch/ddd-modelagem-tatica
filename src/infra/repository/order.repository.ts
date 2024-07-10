import Order from "../../domain/entity/order";
import OrderItem from "../../domain/entity/order_item";
import OrderRepositoryInterface from "../../domain/repository/order-repository.interface";
import CustomerModel from "../db/sequelize/model/customer.model";
import OrderItemModel from "../db/sequelize/model/order-item.model";
import OrderModel from "../db/sequelize/model/order.model";

export default class OrderRepository implements OrderRepositoryInterface {
  async create(entity: Order): Promise<void> {
    await OrderModel.create(
      {
        id: entity.id,
        customer_id: entity.customerId,
        total: entity.total(),
        items: entity.items.map((item) => {
          return {
            id: item.id,
            name: item.name,
            price: item.price,
            product_id: item.productId,
            quantity: item.quantity,
          };
        }),
      },
      {
        include: [
          {
            model: OrderItemModel,
          },
        ],
      }
    );
  }

  async update(entity: Order): Promise<void> {
    await CustomerModel.update({}, { where: { id: entity.id } });
  }

  async find(id: string): Promise<Order> {
    let orderModel;
    try {
      orderModel = await OrderModel.findOne({ where: { id }, rejectOnEmpty: true });
    } catch (error) {
      throw new Error("Order not found");
    }

    const orderItems = orderModel.items.map(
      (item) => new OrderItem(item.id, item.name, item.price, item.product_id, item.quantity)
    );
    const order = new Order(id, orderModel.customer_id, orderItems);

    return order;
  }

  async findAll(): Promise<Order[]> {
    const orderModels = await OrderModel.findAll();

    const orders = orderModels.map((orderModel) => {
      return new Order(
        orderModel.id,
        orderModel.customer_id,
        orderModel.items.map((item) => new OrderItem(item.id, item.name, item.price, item.product_id, item.quantity))
      );
    });

    return orders;
  }
}
