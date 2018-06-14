import mongoose from 'mongoose';

var ProductSchema = mongoose.Schema({
  title: String,
  amount: Number,
  category: Number,
  description: String,
  username: String,
  isreported: Number,
  label: String
},
  {
    timestamps: true
  });

export default mongoose.model('Product', ProductSchema);
