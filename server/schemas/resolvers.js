//resolvers.js: Define the query and mutation functionality to work with the Mongoose models.
const { User, Book } = require('../models');
const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        users: async () => {
            return User.find()
                .select('-__v -password')
                .populate('savedBooks');
              
        },
        user: async (parent, { username }) => {
            return User.findOne({ username })
                .select('-__v -password')
                .populate('savedBooks')
        }
        
    },
    Mutation: {
        addUser: async (parent, args) => {
            const user = await User.create(args);
            const token = signToken(user);
          
            return { token, user };
          },
          login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });
          
            if (!user) {
              throw new AuthenticationError('Incorrect credentials');
            }
          
            const correctPw = await user.isCorrectPassword(password);
          
            if (!correctPw) {
              throw new AuthenticationError('Incorrect credentials');
            }
          
            const token = signToken(user);
            return { token, user };
          },
          saveBook: async (parent, {input}, context) => {
            //   console.log(args)
            //   console.log(context.user._id )
            //   console.log(...args)
            console.log('here')
                console.log(input.authors)
            
            if (context.user) {
            //   const book = await Book.create({ ...input, savedBooks: input });
          
              const book = await User.findByIdAndUpdate(
                // { _id: context.user._id },
                // { $push: { savedBooks: book._id } },
                // { new: true }
                { _id: context.user._id },
                { $addToSet: { savedBooks: input } },
                { new: true }
              );
              
              return book;
            }
          
            throw new AuthenticationError('You need to be logged in!');
          },
          removeBook: async (parent, args, context) => {
            //   console.log(args)
            //   console.log(context.user._id )
            //   console.log(...args)
            console.log('here')
                console.log(args.bookId)
            
            if (context.user) {
            //   const book = await Book.create({ ...input, savedBooks: input });
          
              const book = await User.findByIdAndUpdate(
                // { _id: context.user._id },
                // { $push: { savedBooks: book._id } },
                // { new: true }
                { _id: context.user._id },
                { $pull: { savedBooks: { bookId: args.bookId } } },
                { new: true }
              );
              
              return book;
            }
          
            throw new AuthenticationError('You need to be logged in!');
          },
        }
}

module.exports = resolvers;