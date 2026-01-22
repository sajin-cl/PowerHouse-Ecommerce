const Category = require('../models/category.model');

exports.addCategory = async (req, res) => {
  try {

    const { categoryName, catDescription } = req.body;

    if (!categoryName) return res.status(400).json({ error: 'category is required' });

    const existing = await Category.findOne({ categoryName });
    if (existing) return res.status(400).json({ error: 'category already exist' });

    const category = await Category.create({ categoryName, catDescription });
    res.status(201).json({ message: 'Category created', category })

  }
  catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error for creating category' })
  }
};


exports.getCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).json({ categories });
  }
  catch (err) {
    console.error(err);
    res.status(500).json('Server Error for Fetching Categories')
  }
};