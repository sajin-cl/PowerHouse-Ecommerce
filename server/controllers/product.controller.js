const Category = require('../models/category.model');
const Product = require('../models/product.model');
const Brand = require('../models/brand.model');
const User = require('../models/auth.model');

exports.addProducts = async (req, res) => {

  try {
    const { name, description, category, brand, stock, price } = req.body;

    if (!name || !description || !category || !brand || !stock || !price) return res.status(400).json({ error: 'All fields are required' });

    if (!req.files || !req.files?.productImage) return res.status(400).json({ error: 'Product image is required' });

    const categoryExists = await Category.findById(category);
    if (!categoryExists) return res.status(400).json({ error: 'Invalid Category' });

    const brandExists = await Brand.findById(brand);
    if (!brandExists) return res.status(400).json({ error: 'Invalid Brand' });


    const image = req.files.productImage;
    const fileName = Date.now() + '_' + image.name;
    const uploadPath = `public/assets/product/${fileName}`;

    await image.mv(uploadPath);

    const product = await Product.create({
      name,
      description,
      brand,
      category,
      stock,
      price,
      sellerId: req.session.userData.id,
      isSeller: req.session.userData.role === 'seller' ? true : false,
      image_url: `/assets/product/${fileName}`
    });

    res.status(201).json({
      message: 'Product added successfully',
      product
    })

  }
  catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to add Product' });
  }
};


exports.getProducts = async (req, res) => {
  try {

    const products = await Product.find().sort({ createdAt: 1 });
    if (!products) return res.status(400).json({ error: 'Failed to fetch products' });

    const visibleProducts = [];

    for (let product of products) {

      const seller = await User.findById(product.sellerId);

      if (seller && !seller.isBlocked) {
        visibleProducts.push(product);
      }
    }

    res.status(200).json(visibleProducts);
    console.log('visible product', visibleProducts)
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch products' });
  }
};

exports.getProductsId = async (req, res) => {
  try {

    const { id } = req.params;

    const product = await Product.findById(id).populate('category').populate('brand');
    if (!product) return res.status(400).json({ error: 'Product not found' });

    res.status(200).json(product);

  }
  catch (err) {
    console.error(err);
    res.status(500).json({ error: 'failed to fetch product' });
  }
};

exports.updateProducts = async (req, res) => {
  try {

    const { id } = req.params;

    const { name, description, category, brand, stock, price } = req.body;

    if (!name || !description || !category || !brand || !stock || !price) return res.status(400).json({ error: 'All fields are required' });

    const categoryExists = await Category.findById(category);
    if (!categoryExists) return res.status(400).json({ error: 'Invalid category' });

    const brandExists = await Brand.findById(brand);
    if (!brandExists) return res.status(400).json({ error: 'Invalid Brand' });


    const updatedData = {
      name,
      description,
      category,
      brand,
      stock,
      price,
      sellerId: req.session?.userData?.id,
      isSeller: req.session?.userData?.role === 'seller' ? true : false
    }

    if (req.files && req.files.productImage) {
      const image = req.files.productImage;
      const fileName = Date.now() + "_" + image.name;
      const uploadPath = `public/assets/product/${fileName}`;
      await image.mv(uploadPath);

      updatedData.image_url = `/assets/product/${fileName}`;
    }

    const updatedProduct = await Product.findByIdAndUpdate(id, updatedData, { new: true });
    if (!updatedProduct) return res.status(404).json({ error: 'Product not found' });

    return res.status(200).json({
      message: 'Product updated',
      product: updatedProduct
    })

  }
  catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to update products' });
  }
};


exports.deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    await Product.findByIdAndDelete(id);
    res.status(200).json({ message: 'Product deleted successfully' });
  }
  catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to delete product' });
  }
}