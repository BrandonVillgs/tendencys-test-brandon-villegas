import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  height: { type: Number, required: true },
  length: { type: Number, required: true },
  width: { type: Number, required: true },
});

export default mongoose.model('Product', ProductSchema, 'catalog_products');
