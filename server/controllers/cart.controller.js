const Cart = require('../models/cart.model');
const Product = require('../models/product.model');

exports.addToCart = async (req, res) => {
  try {

    const { productId, quantity } = req.body;

    const userId = req.session?.userData?.id;


    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ error: 'Product not found' });

    if (product.stock <= 0) {
      return res.status(400).json({ error: 'Product is out of stock' });
    }

    if (quantity > product.stock) {
      return res.status(400).json({ error: `Only ${product.stock} items available` });
    }

    let cartItem = await Cart.findOne({ user: userId, product: productId });

    if (cartItem) {
      cartItem.quantity += quantity;
      await cartItem.save();
    }
    else {
      cartItem = await Cart.create({ user: userId, product: productId, quantity });
    }

    res.status(200).json(cartItem);
  }
  catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to add to cart' });
  }
};

exports.getUserCart = async (req, res) => {
  try {

    const userId = req.session.userData.id;
    if (!userId) return res.status(401).json({ error: 'Not logged in' });

    const cartItems = await Cart.find({ user: userId })
      .populate("product")
      .populate("product.brand")
      .populate("product.category");

    if (!cartItems) return res.status(404).json({ error: 'Cart Items not found' });

    res.status(200).json(cartItems);
  }
  catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch cart" });
  }
};


exports.updateCartItems = async (req, res) => {
  try {

    const { id } = req.params;

    const { quantity } = req.body;

    const userId = req.session?.userData?.id;
    if (!userId) return res.status(401).json({ error: 'Not logged in' });

    const cartItem = await Cart.findOne({ _id: id, user: userId }).populate('product');
    if (!cartItem) return res.status(404).json({ error: 'Cart item not found' });

    if (quantity > cartItem.product.stock) return res.status(400).json({ error: 'Insufficient stock' });
    if (quantity < 1) return res.status(400).json({ error: 'Quantity must be at least 1' });

    cartItem.quantity = quantity;
    await cartItem.save();

    res.status(200).json(cartItem);

  }
  catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to update cart' });
  }
};


exports.removeCartItem = async (req, res) => {
  try {

    const { id } = req.params;

    const userId = req.session?.userData?.id;
    if (!userId) return res.status(401).json({ error: 'Not logged in' });

    const cartItem = await Cart.findOneAndDelete({ _id: id, user: userId });
    if (!cartItem) return res.status(404).json({ error: 'Cart item not found' });

    res.status(200).json({ message: 'Item removed from cart' });
  }
  catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to remove cart item' });
  }
};