const Category = require('../models/category.model');
const Brand = require('../models/brand.model')

exports.addCategory = async (req, res) => {
  try {

    const { name, description } = req.body;

    if (!name) return res.status(400).json({ error: 'category is required' });

    const existing = await Category.findOne({ name });
    if (existing) return res.status(400).json({ error: 'category already exist' });


    const category = await Category.create({ name, description });
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
    res.status(200).json(categories);
  }
  catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server Error for Fetching Categories' })
  }
};


exports.editCategory = async (req, res) => {
  try {
    const { id } = req.params;

    const category = await Category.findById(id);
    console.log(category)
    res.status(200).json(category);
  }
  catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Server error for fetching category' });
  };
};

exports.updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description } = req.body;

    const category = await Category.findById(id);

    const existing = await Category.findOne({ name });
    if (existing) return res.status(400).json({ error: 'category already exist' });

    if (name !== undefined) category.name = name;
    if (description !== undefined) category.description = description;

    await category.save();
    return res.status(200).json(category);
  }
  catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Updation failed ' })
  }
};

exports.deleteCategory = async (req, res) => {
  try {
    const id = req.params.id;
    await Category.findByIdAndDelete(id);
    res.status(200).json({ message: 'category deleted' });
  }
  catch (err) {
    res.status(500).json({ error: 'category deletion problem' });
  }

};

exports.addBrand = async (req, res) => {
  try {
    const { name, description } = req.body;

    if (!name) return res.status(400).json({ error: 'Brand name is required' });

    const existing = await Brand.findOne({ name });
    if (existing) return res.status(400).json({ error: 'Brand name aleready exist' });

    const brand = await Brand.create({ name, description });
    res.status(201).json({ message: 'Brand created', brand });
  }
  catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Brand name doesn\'t  created' });
  }

};

exports.getBrands = async (req, res) => {
  try {
    const brands = await Brand.find();
    res.status(200).json(brands);
  }
  catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error for fetching brands' });
  }
};