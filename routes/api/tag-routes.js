const router = require("express").Router();
const { Tag, Product, ProductTag } = require("../../models");

// The `/api/tags` endpoint

router.get("/", async (req, res) => {
  // find all tags
  try {
    const allTags = await Tag.findAll({
      include: {
        model: Product,
        attributes: ["product_name", "price", "stock", "category_id"],
      },
    });
    res.json(allTags);
  } catch (error) {
    res.status(500).json({ error });
  }
});

router.get("/:id", async (req, res) => {
  // find a single tag by its `id`
  try {
    const oneTag = await Tag.findOne({
      where: {
        id: req.params.id,
      },
      include: {
        model: Product,
        attributes: ["product_name", "price", "stock", "category_id"],
      },
    });
    res.json(oneTag);
  } catch (error) {
    res.status(500).json({ error });
  }
});

router.post("/", async (req, res) => {
  // create a new tag
  try {
    const newTag = await Tag.create({
      tag_name: req.body.tag_name,
    });
    res.json(newTag);
  } catch (error) {
    res.status(500).json({ error });
  }
});

router.put("/:id", async (req, res) => {
  // update a tag's name by its `id` value
  const updatedTag = await Tag.findByPk(req.params.id);
  try {
    await Tag.update(req.body, {
      where: {
        id: req.params.id,
      },
    });

    res.json(updatedTag);
  } catch (error) {
    res.status(500).json({ error });
  }
});

router.delete("/:id", async (req, res) => {
  // delete on tag by its `id` value
  const deletedTag = await Tag.findByPk(req.params.id);

  try {
    await Tag.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.json(deletedTag);
  } catch (error) {
    res.status(500).json({ error });
  }
});

module.exports = router;
