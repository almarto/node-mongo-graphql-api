import { User, UserRequest } from "../models/User.model";
import Hapi from "hapi";

/**
 * List Users
 */
export const list = (request: UserRequest, h: Hapi.ResponseToolkit) =>
  User.find({})
    .exec()
    .then(users => {
      return { users, statusCode: 200 };
    })
    .catch(err => {
      return { err: err, statusCode: 500 };
    });

/**
 * Get User by ID
 */
export const get = (request: UserRequest, h: Hapi.ResponseToolkit) =>
  User.findById(request.params.userId)
    .exec()
    .then(user => {
      if (!user) return { message: "User not Found", code: 404 };

      return { user, statusCode: 200 };
    })
    .catch(err => {
      return { err: err, statusCode: 500 };
    });

/**
 * POST a User
 */
export const create = async (request: UserRequest, h: Hapi.ResponseToolkit) => {
  const { firstName, lastName, email, mobile, hobbies } = request.payload;

  const userData = new User({
    firstName,
    lastName,
    email,
    mobile,
    hobbies
  });

  const createdUser = await User.create(userData);

  return {
    message: "User created successfully",
    user: createdUser,
    statusCode: 200
  };
};

/**
 * PUT | Update User by ID
 */
export const update = async (request: UserRequest, h: Hapi.ResponseToolkit) => {
  const user = await User.findById(request.params.userId).exec();
  if (!user) return { message: "User not found", statusCode: 404 };

  await user.update({ ...request.payload });

  return {
    statusCode: 200,
    message: "User data updated successfully"
  };
};

/**
 * Delete User by ID
 */
export const remove = async (request: UserRequest, h: Hapi.ResponseToolkit) => {
  const user = await User.findById(request.params.userId);

  if (!user) {
    return { message: "User not found", statusCode: 404 };
  }

  const removedUser = await user.remove();

  return { user: removedUser, statusCode: 200 };
};
