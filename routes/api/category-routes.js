const router = require("express").Router();
const { Category, Product } = require("../../models");

// The `/api/categories` endpoint

router.get("/", async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try {
    const category = await Category.findAll({
      include: Product,
      attributes: ["id", "product_name", "price", "stock", "category_id"],
    });
    res.status(200).json(category);
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
});

router.get("/:id", async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    const oneCategory = await Category.findByPk({
      where: {
        id: req.params.id,
      },
      include: Product,
      attributes: ["id", "product_name", "price", "stock", "category_id"],
    });
    if (!oneCategory) {
      res.status(404).json({ message: "Category not found" });
    }
    res.status(200).json(category);
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
});

router.post("/", async (req, res) => {
  // create a new category
  try {
    const newCategory = await Category.create({
      category_name: req.body.category_name,
    });
    res.status(200).json(newCategory);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Internal server error making new category" });
  }
});

router.put("/:id", async (req, res) => {
  // update a category by its `id` value
  const { category_name } = req.body;
  try {
    await Category.update(
      {
        category_name,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    const updatedCategory = await Category.findByPk(req.params.id);
    res.json(updatedCategory);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Internal server error updating category ID" });
  }
});

router.delete("/:id", async (req, res) => {
  // delete a category by its `id` value
  const delCategory = await Category.findByPk(req.params.id);
  try {
    await Category.destroy({
      where: { id: req.params.id },
    });
    res.json(delCategory);
    res.status(200).json({ message: "Category deleted" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Internal server error deleting category ID" });
  }
});

module.exports = router;
