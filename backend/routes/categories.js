const {Category} = require('../models/category');
const express = require('express');
const router = express.Router();

router.get(`/`, async (req, res) => {
  const categoryList = await Category.find();

  if (!categoryList) {
    res.status(500).json({success: false});
  }
  res.send(categoryList);
});

router.get(`/:id`, async (req, res) => {
  const category = await Category.findById(req.params.id);

  if (!category) {
    res
      .status(500)
      .json({message: 'the category with the given ID was not found'});
  }
  res.send(category);
});

router.post('/', async (req, res) => {
  let category = new Category({
    name: req.body,
    icon: req.body.icon,
    color: req.body.color,
  });

  category = await category.save();
  if (!category) {
    return res.status(404).send('the category cannot be created!');
  }

  res.send(category);
});

router.put(`/:id`, async (req, res) => {
  const category = await Category.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body,
      icon: req.body.icon,
      color: req.body.color,
    },
    {new: true},
  );

  if (!category) {
    res
      .status(500)
      .json({message: 'the category with the given ID was not found'});
  }
  res.send(category);
});

router.delete('/:id', async (req, res) => {
  const deleteItem = await Category.findByIdAndDelete(req.params.id);

  if (deleteItem) {
    res.status(200).json({success: true, message: 'the category is deleted'});
  }
});

module.exports = router;
