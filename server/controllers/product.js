import productModel from "../models/product.js";

// add products
export const addProduct = async (req, res) => {
  const { name, category, price } = req.body;
  if (!price || !name || !category) {
    res.status(204).send({ error: true, message: "Fill the required fields" });
    return;
  }

  const product = await productModel({
    name,
    price,
    category,
    id: Math.random().toString(32).substring(2),
    thumbnail: `https://source.unsplash.com/random/250x250/?${name}`,
  });
  await product.save();

  if (!product) {
    res.status(401).send({ error: true, message: "Something going wrong" });
    return;
  }
  res.status(201).send({
    error: false,
    message: "Product has been saved successfull",
    product,
  });
  return;
};

// delete products

export const deleteProducts = async (req, res) => {
  const { id } = req.body;
  if (!id) {
    res.status(204).send({ error: true, message: "No product found" });

    return;
  }
  try {
    const deleted = await productModel.findOneAndDelete({ id });

    res
      .status(200)
      .send({ error: false, message: " products is deleted successfully" });
    return;
  } catch (error) {
    res.send({ error: "bad req", message: "NO" });
    return;
  }
};

// get products
export const getProducts = async (req, res) => {
  const products = await productModel.find();
  return res.status(200).send({ products });
};
