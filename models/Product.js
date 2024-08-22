import mongoose, { Schema, models, model } from "mongoose"

const ProductSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  images: [{ type: String }],
  price: { type: Number, required: true },
})

export const Product = models.Product || model("Product", ProductSchema)
