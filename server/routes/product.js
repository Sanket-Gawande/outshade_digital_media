import express, { Router } from "express";
import {
  addProduct,
  deleteProducts,
  getProducts,
} from "../controllers/product.js";
const productRouter = express.Router();

productRouter.post("/add", addProduct);
productRouter.get("/get", getProducts);
productRouter.post("/delete", deleteProducts);

export default productRouter;
