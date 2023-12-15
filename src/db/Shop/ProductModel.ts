import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
    name: { type: String, required: true },
    isAvailable: { type: Boolean },
    quantity: { type: Number},
    createdDate: { type: Date },
    price: { type: mongoose.Schema.Types.Decimal128 }
  });

  export const ProductModel = mongoose.model("Product", ProductSchema);

  //Product actions
  export const SelectAll = () => ProductModel.find();

  export const Select1ById = (id: string) => ProductModel.findById(id);

  export const Insert = (values: Record<string, any>) => new ProductModel(values).save().then((product) => product.toObject());

  export const UpdateById = (id: string, values: Record<string, any>) => ProductModel.findByIdAndUpdate(id, values);

  export const DeleteById = (id: string) => ProductModel.findOneAndDelete({ _id: id });