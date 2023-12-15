import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    email: { type: String, required: true },
    username: { type: String, required: true },
    authentication: {
      password: { type: String, required: true, select: false },
      salt: { type: String, select: false },
      sessionToken: { type: String, select: false },
    },
  });

  export const UserModel = mongoose.model("User", UserSchema);

  //User actions
  export const SelectAll = () => UserModel.find();

  export const Select1ById = (id: string) => UserModel.findById(id);

  export const Insert = (values: Record<string, any>) => new UserModel(values).save().then((user) => user.toObject());

  export const UpdateById = (id: string, values: Record<string, any>) => UserModel.findByIdAndUpdate(id, values);

  export const DeleteById = (id: string) => UserModel.findOneAndDelete({ _id: id });

  //Custom actions
  export const SelectByEmail = (email: string) => UserModel.findOne({ email });

  export const SelectBySessionToken = (sessionToken: string) => UserModel.findOne({ "authentication.sessionToken": sessionToken });