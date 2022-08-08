const { AuthenticationError } = require('apollo-server-express');
const { User, Book } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        const newUser = await User.findOne(
          { _id: context.user._id },
     
        );
        return newUser
      }
      throw new AuthenticationError("You need to be logged in!");
    },
  },
  Mutation: {
    addUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);
      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError("No user found with this email address");
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError("Incorrect credentials");
      }

      const token = signToken(user);

      return { token, user };
    },

    saveBook: async (parent, { book }, context) => {
      if (context.user) {
        // console.log(book)
        // console.log(context.user)
        const newBook = book

        const user = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { savedBooks: newBook } },
          { new: true, runValidators: true }
        );

        return user
      }
      throw new AuthenticationError("You need to be logged in!");
    },

    removeBook: async (parent, { removedBookId }, context) => {
      if (context.user) {
        console.log(context.user)
        console.log(removedBookId)
           const user = await User.findOneAndUpdate(
             { _id: context.user._id },
             { $pull: { savedBooks: { bookId: removedBookId } } },
             { new: true }
           );

           return user;
      }
      throw new AuthenticationError("You need to be logged in!");
    },
  },
};

module.exports = resolvers;
