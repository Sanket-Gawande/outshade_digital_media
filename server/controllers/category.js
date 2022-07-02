import categoryModel from "../models/category.js";
import productModel from "../models/product.js";
import tokenGenerator from "../utils/tokenGen.js";

// add categoris
export const addCategory = async (req, res) => {
  const { category } = req.body;
  if (!category) {
    res.status(204).send({ error: true, message: "No category found" });
    return;
  }
  try {
    const cat = await categoryModel({
      name: category,
      id: Math.random().toString(32).substring(2),
      thumbnail: `https://source.unsplash.com/random/250x250/?${category}`,
    });
    await cat.save();
    res.status(200).send({
      error: false,
      message: "Category added successfully.",
      category: cat,
    });
  } catch (error) {
    if (error.name === "MongoServerError") {
      res
        .status(401)
        .send({ error: true, message: "Duplicate category not allowed" });
      return;
    }
    res.status(401).send({ error: true, message: "Something gonna wrong" });
    
    return;
  }
};

// delete categories

export const deleteCategories = async (req, res) => {
  const { id, name } = req.body;
  if (!id || !name) {
    res.status(204).send({ error: true, message: "No category found" });

    return;
  }
  const deleted = await categoryModel.findOneAndDelete({ id });
  const toDelete = await productModel.find({ category: name });
  const deletedIds = toDelete.map((obj) => obj.id);

  const deletedProducts = await productModel.deleteMany({ category: name });
  res.status(200).send({
    error: false,
    message: "Category and related products are deleted successfully",

    deletedIds,
  });
  return;
};
// get categories
export const getCategories = async (req, res) => {
  const cat = await categoryModel.find();
  res
    .status(200)
    .send({ error: false, message: "yes", category: cat });
  return;
};
