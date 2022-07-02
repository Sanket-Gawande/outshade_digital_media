import express, { Router } from "express";

import {  addCategory , getCategories , deleteCategories } from "../controllers/category.js";
const categoryRouter = express.Router();

categoryRouter.post("/add", addCategory);
categoryRouter.get("/get", getCategories);
categoryRouter.post("/delete", deleteCategories);

export default categoryRouter;
