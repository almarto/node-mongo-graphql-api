import { Document, Schema, Model, model } from "mongoose";

interface IUser {
  firstName: string;
  lastName: string;
  email: string;
  mobile?: number;
  hobbies?: string[];
}

export interface IUserModel extends IUser, Document {
  fullName(): string;
}

const UserSchema: Schema = new Schema({
  createdAt: Date,
  email: String,
  firstName: String,
  lastName: String,
  mobile: Number,
  hobbies: [String],
});

UserSchema.pre("save", next => {
  const now = new Date();
  if (!this.createdAt) {
    this.createdAt = now;
  }
  next();
});

UserSchema.methods.fullName = (): string =>
  this.firstName.trim() + " " + this.lastName.trim();

export const User: Model<IUserModel> = model<IUserModel>("User", UserSchema);
