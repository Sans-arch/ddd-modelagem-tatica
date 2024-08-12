import express, { Request, Response } from "express";
import CreateProductUseCase from "../../../usecase/product/create/create.product.usecase";
import ProductRepository from "../../product/repository/sequelize/product.repository";
import { InputCreateProductDto } from "../../../usecase/product/create/create.product.dto";
import FindProductUsecase from "../../../usecase/product/find/find.product.usecase";
import { InputFindProductDto } from "../../../usecase/product/find/find.product.dto";
import ListProductUseCase from "../../../usecase/product/list/list.product.usecase";
import UpdateProductUsecase from "../../../usecase/product/update/update.product.usecase";
import { InputUpdateProductDto } from "../../../usecase/product/update/update.product.dto";

export const productRoute = express.Router();

productRoute.post("/", async (req: Request, res: Response) => {
  const usecase = new CreateProductUseCase(new ProductRepository());
  try {
    const productDto: InputCreateProductDto = {
      name: req.body.name,
      price: req.body.price,
      type: req.body.type,
    };

    const output = await usecase.execute(productDto);
    return res.json(output);
  } catch (err) {
    return res.status(500).send(err);
  }
});

productRoute.get("/", async (req: Request, res: Response) => {
  const usecase = new FindProductUsecase(new ProductRepository());
  try {
    const productDto: InputFindProductDto = {
      id: req.query.id as string,
    };

    const output = await usecase.execute(productDto);
    return res.json(output);
  } catch (err) {
    return res.status(500);
  }
});

productRoute.get("/list", async (req: Request, res: Response) => {
  const usecase = new ListProductUseCase(new ProductRepository());
  try {
    const output = await usecase.execute({});
    return res.json(output);
  } catch (err) {
    return res.status(500);
  }
});

productRoute.put("/", async (req: Request, res: Response) => {
  const usecase = new UpdateProductUsecase(new ProductRepository());
  try {
    const productDto: InputUpdateProductDto = {
      id: req.body.id,
      name: req.body.name,
      price: req.body.price,
    };

    const output = await usecase.execute(productDto);
    return res.json(output);
  } catch (err) {
    return res.status(500);
  }
});
