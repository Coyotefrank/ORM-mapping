const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  try {
    const CategoryData = await Category.findAll({
      include: [{model:Product}],
    });
    res.status(200).json(CategoryData);
  } catch (err){
    res,status(500).json(err);
  }
  // find all categories
  // be sure to include its associated Products
});

router.get('/:id', async (req, res) => {})
  // find one category by its `id` value
 

router.post('/',async (req, res) => {
  try {
    const CategoryData = await Category.create(req.body);
    res.status(200).json(renderData);
  } catch (err) {
    res.status(400).json(err);
  }
  // create a new category
});

router.put('/:id', async (req, res) => {
  const categoryId = req.params.id;
  const updatedCategoryInfo = req.body; 

  try {
    const [updatedRows] = await Category.update(updatedCategoryInfo, {
      where: {
        id: categoryId
      }
    });

    if (updatedRows === 1) {
      res.status(200).json({ message: `Category with ID ${categoryId} updated successfully.` });
    } else {
      res.status(404).json({ error: `No category with ID ${categoryId} found.` });
    }
  } catch (error) {
    console.error('Error updating category:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Start the Express server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
  // update a category by its `id` value


router.delete('/:id', async (req, res) => {
  const categoryId = req.params.id;

  try {
    const deletedRows = await Category.destroy({
      where: {
        id: categoryId
      }
    });

    if (deletedRows === 1) {
      res.status(200).json({ message: `Category with ID ${categoryId} deleted successfully.` });
    } else {
      res.status(404).json({ error: `No category with ID ${categoryId} found.` });
    }
  } catch (error) {
    console.error('Error deleting category:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Start the Express server
// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);

  // delete a category by its `id` value

module.exports = router;
