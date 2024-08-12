import { app, sequelize } from "../express";
import request from "supertest";

describe("E2E test for product", () => {
  beforeEach(async () => {
    await sequelize.sync({ force: true });
  });

  afterAll(async () => {
    await sequelize.close();
  });

  it("should create a product", async () => {
    const response = await request(app).post("/product").send({
      name: "Product 1",
      price: 14.5,
      type: "a",
    });
    const response2 = await request(app).post("/product").send({
      name: "Product 2",
      price: 30.0,
      type: "b",
    });

    expect(response.status).toBe(200);
    expect(response.body.name).toBe("Product 1");
    expect(response.body.price).toBe(14.5);
    expect(response2.status).toBe(200);
    expect(response2.body.name).toBe("Product 2");
    expect(response2.body.price).toBe(60);
  });

  it("should find a product", async () => {
    const product1Response = await request(app).post("/product").send({
      name: "Product 1",
      price: 14.5,
      type: "a",
    });
    const product2Response = await request(app).post("/product").send({
      name: "Product 2",
      price: 30.0,
      type: "b",
    });

    const response = await request(app).get("/product").query({ id: product1Response.body.id }).send();
    const response2 = await request(app).get("/product").query({ id: product2Response.body.id }).send();

    expect(response.status).toBe(200);
    expect(response.body.name).toBe("Product 1");
    expect(response.body.price).toBe(14.5);
    expect(response2.status).toBe(200);
    expect(response2.body.name).toBe("Product 2");
    expect(response2.body.price).toBe(60);
  });

  it("should list products", async () => {
    await request(app).post("/product").send({
      name: "Product 1",
      price: 14.5,
      type: "a",
    });
    await request(app).post("/product").send({
      name: "Product 2",
      price: 30.0,
      type: "b",
    });

    const response = await request(app).get("/product/list").send();

    expect(response.status).toBe(200);
    expect(response.body.products).toHaveLength(2);
    expect(response.body.products[0].name).toBe("Product 1");
    expect(response.body.products[0].price).toBe(14.5);
    expect(response.body.products[1].name).toBe("Product 2");
    expect(response.body.products[1].price).toBe(60.0);
  });

  it("should update a product", async () => {
    const product1CreatedResponse = await request(app).post("/product").send({
      name: "Product 1",
      price: 14.5,
      type: "a",
    });

    expect(product1CreatedResponse.status).toBe(200);
    expect(product1CreatedResponse.body.name).toBe("Product 1");
    expect(product1CreatedResponse.body.price).toBe(14.5);

    const response = await request(app).put("/product").send({
      id: product1CreatedResponse.body.id,
      name: "Product 1 Updated",
      price: 47.3,
    });

    expect(response.status).toBe(200);
    expect(response.body.name).toBe("Product 1 Updated");
    expect(response.body.price).toBe(47.3);
  });
});
