import mongoose, { Schema, model, models } from "mongoose";

const ProductSchema = new Schema(
  {
    creator: { type: Schema.Types.ObjectId, ref: "User" },
    title: { type: String, required: [true, "Title is Required"] },
    description: { type: String },
    price: { type: Number, required: [true, "Price is Required"] },
    images: [{ type: String }],
    category: { type: Schema.Types.ObjectId, ref: "Category" },
    properties: { type: Object },
  },
  {
    timestamps: true,
  }
);

const Product = models?.Product || model("Product", ProductSchema);
export default Product;
