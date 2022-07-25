const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try {
    const category = await Category.findAll({
      include: [Product]
    });
    res.status(200).json(category);
  }catch (err) {
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.get('/:id', (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    const category = await Category.findByPk({
      where: {
        id: req.params.id
      },
      include: [Product]
    });
    if(!category) {
      res.status(404).json({ message: 'Category not found' });
    }
    res.status(200).json(category);
  }catch (err){
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.post('/', (req, res) => {
  // create a new category
  try {
    const category = await Category.create(req.body);
    res.status(200).json(category);
  }catch (err) {
    res.status(500).json({ message: 'Internal server error making new category' });
  }
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
  try {
    const category = await Category.update(req.body, {
      where: {
        id: req.params.id
      }
    });
    if(!category) {
      res.status(404).json({ message: 'Category not found ID' });
    }
    res.status(200).json(category);
  }catch (err) {
    res.status(500).json({ message: 'Internal server error updating category ID' });
  }
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  try {
    const delCategory = await Category.destroy({where: {id: req.params.id}});
    res.status(200).json({ message: 'Category deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Internal server error deleting category ID' });
  }
});

module.exports = router;
