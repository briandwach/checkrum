const { User, Thought, Client, Room, Equipment, Location } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');

const seedDatabase = require('../seeders/seed.js');

const resolvers = {
  Query: {
    users: async () => {
      return User.find().populate('thoughts');
    },
    user: async (parent, { username }) => {
      return User.findOne({ username }).populate('thoughts');
    },
    thoughts: async (parent, { username }) => {
      const params = username ? { username } : {};
      return Thought.find(params).sort({ createdAt: -1 });
    },
    thought: async (parent, { thoughtId }) => {
      return Thought.findOne({ _id: thoughtId });
    },
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id }).populate('thoughts');
      }
      throw AuthenticationError;
    },
    clients: async (parent, args, context) => {
      if (context.user) {
        return Client.find({})
      }
      //throw AuthenticationError;
    },
    equipmentItems: async () => {
      //if (context.user){
      return Equipment.find()
      // }
    },
    room: async (parent, args, context) => {
      //if (context.user){
      return Room.findById(args.id).populate({ path: 'location', populate: { path: 'client' } }).populate('equipment');
      //}
      //throw AuthenticationError;
    },
    allRooms: async (parent, args, context) => {
      //if (context.user){
      return Room.find().populate({ path: 'location', populate: { path: 'client' } }).populate('equipment');
      //}
      //throw AuthenticationError;
    },
    allStaff: async (parent, args, context) => {
      return User.find({ role: 'staff' }).populate('username');
    },
    roomEquipment: async (parent, args, context) => {
      //if (context.user){
      return Room.findById(args.id).populate('equipment');
      //}
      //throw AuthenticationError;
    },
  },

  Mutation: {
    addUser: async (parent, { username, email, password, role }) => {
      const user = await User.create({ username, email, password, role });
      const token = signToken(user);
      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw AuthenticationError;
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw AuthenticationError;
      }

      const token = signToken(user);

      return { token, user };
    },
    addThought: async (parent, { thoughtText }, context) => {
      if (context.user) {
        const thought = await Thought.create({
          thoughtText,
          thoughtAuthor: context.user.username,
        });

        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { thoughts: thought._id } }
        );

        return thought;
      }
      throw AuthenticationError;
    },
    addComment: async (parent, { thoughtId, commentText }, context) => {
      if (context.user) {
        return Thought.findOneAndUpdate(
          { _id: thoughtId },
          {
            $addToSet: {
              comments: { commentText, commentAuthor: context.user.username },
            },
          },
          {
            new: true,
            runValidators: true,
          }
        );
      }
      throw AuthenticationError;
    },
    removeThought: async (parent, { thoughtId }, context) => {
      if (context.user) {
        const thought = await Thought.findOneAndDelete({
          _id: thoughtId,
          thoughtAuthor: context.user.username,
        });

        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { thoughts: thought._id } }
        );

        return thought;
      }
      throw AuthenticationError;
    },
    removeComment: async (parent, { thoughtId, commentId }, context) => {
      if (context.user) {
        return Thought.findOneAndUpdate(
          { _id: thoughtId },
          {
            $pull: {
              comments: {
                _id: commentId,
                commentAuthor: context.user.username,
              },
            },
          },
          { new: true }
        );
      }
      throw AuthenticationError;
    },
    addClient: async (parent, { businessName, contactName, contactEmail }, context) => {
      if (context.user) {
        const client = await Client.create({ businessName, contactName, contactEmail });

        return client;
      }
      throw AuthenticationError;
    },
    addEquipment: async (parent, { equipmentName }, context) => {
      if (context.user) {
        const equipment = await Equipment.create({
          equipmentName
        });
        return equipment
      }
      throw AuthenticationError;
    },
    editUser: async (parent, { username, role }, context) => {
      const user = await User.findOneAndUpdate(
        { username },
        { role },
        { new: true }
      );
      return user;
    },

    seed: async () => {
      const result = await seedDatabase();
      return result;
    },
    removeEquipment: async (parent, { equipmentId }, context) => {
      if (context.user) {
        const equipment = await Equipment.findOneAndDelete({
          _id: equipmentId,
        });
    }
  },
    editEquipment: async (parent, { equipmentId, equipmetName }, context) => {
      if (context.user) {
        const equipment = await Equipment.findOneAndUpdate({
          _id: equipmentId
        }, {
          $set: {equipmentName: equipmentName}
        })
        return equipment
      }
    },
    addLocation: async (parent, { locationName }, context) => {
      if (context.user) {
        const location = await Location.create({
          locationName,
          address,
          accessInstructions,
          client
        })
      }
      return location
    }
  }
}

module.exports = resolvers;