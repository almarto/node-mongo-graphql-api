import Hapi from "hapi";

import { User, UserRequest } from "../models/User.model";

/************** GraphQL Query Methods **************/

const getAll = async () => {
  const userList = await User.find({}).exec();
  return { users: userList, statusCode: 200 };
};

const getById = async (id: string) => {
  const user = await User.findById(id).exec();
  if (!user) return { message: "User not Found", statusCode: 404 };

  return { user, statusCode: 200 };
};

/************** Hapi Controller Methods **************/

/**
 * List Users
 */
const list = (request: UserRequest, h: Hapi.ResponseToolkit) => getAll();

/**
 * Get User by ID
 */
const get = (request: UserRequest, h: Hapi.ResponseToolkit) =>
  getById(request.params.userId);

/**
 * POST a User
 */
const create = async (request: UserRequest, h: Hapi.ResponseToolkit) => {
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
const remove = async (request: UserRequest, h: Hapi.ResponseToolkit) => {
  const user = await User.findById(request.params.userId);

  if (!user) {
    return { message: "User not found", statusCode: 404 };
  }

  const removedUser = await user.remove();

  return { user: removedUser, statusCode: 200 };
};

export const GraphQLUserController = {
  getById,
  getAll
};

export const UserController = {
  list,
  get,
  create,
  update,
  remove
};
