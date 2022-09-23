const { AuthenticationError } = require('apollo-server-express');
const { User, Set } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      console.log(context.user)
      if (context.user) {
        const user = await User.findOne({ _id: context.user._id });
        return user
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    set: async ( parent, { Name }) => {
      const set = await Set.findOne({Name: Name})
      console.log(set)
      return set;
    }
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
        throw new AuthenticationError('No user found with this email address');
      }
      const correctPw = await user.isCorrectPassword(password);
      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }
      const token = signToken(user);
      return { token, user };
    }
    // searchSets: async (parent, { Name }) => {
    //   return LegoSets.find({ Name });
    // }

  },
};

module.exports = resolvers;