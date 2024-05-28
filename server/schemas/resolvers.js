const { User, Thought, Client, Room, Equipment, Location, Result, Report } = require('../models');

const { signToken, AuthenticationError } = require('../utils/auth');

const seedDatabase = require('../seeders/seed.js');
const cleanReportsAndResults = require('../seeders/cleanReportsAndResults.js');

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
      return User.find().populate('username').populate('role').populate('email');
    },
    roomEquipment: async (parent, args, context) => {
      //if (context.user){
      return Room.findById(args.id).populate('equipment');
      //}
      //throw AuthenticationError;
    },
    getClient: async (parent, { id }) => {
      return Client.findOne({ _id: id});
    },
    allLocations: async (parent, args, context) => {
      return Location.find().populate('locationName');
    },
    roomByLocation: async (parent, args, context) => {
      const location = await Location.findOne({ locationName: args.name });
      return Room.find({ location: location._id }).populate({ path: 'location', populate: { path: 'client' } }).populate('equipment');
    },
    allReports: async (parent, args, context) => {
      return Report.find().populate('roomId').populate('assignedStaff');
    },
    locations: async (parent, args, context) => {
      return Location.find();
    },
    assignedReportsByStaff: async (parent, args, context) => {
      return Report.find({ assignedStaff: args.assignedStaff, inspectionDate: null }).populate({ path: 'roomId', populate: { path: 'location', populate: { path: 'client' } } });
    },
    completedReportsByStaff: async (parent, args, context) => {
      return Report.find({ assignedStaff: args.assignedStaff, inspectionDate: { $ne: null } }).populate({ path: 'results', populate: { path: 'equipmentId' } }).populate({ path: 'roomId', populate: { path: 'location', populate: { path: 'client' } } });
    },
    roomInfoByReportId: async (parent, { id }, context) => {
      return Report.findById(id).populate({ path: 'results', populate: { path: 'equipmentId' } }).populate({ path: 'roomId', populate: [{ path: 'location', populate: { path: 'client' } }, { path: 'equipment' }] });
    },
    resultDataByReportId: async (parent, { id }, context) => {
      return Report.findById(id).populate({ path: 'results', populate: { path: 'equipmentId' } });
    },
    rooms: async (parent, args, context) => {
      return await Room.find().populate('equipment');
    },
    locationsRevised: async (parent, args, context) => {
      return await Client.find().populate([{ path: 'locations' }, {path: 'locations', populate:{ path: 'rooms'}}])
    }
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
    addClient: async (parent, { businessName, contactName, contactEmail, locations }, context) => {
      if (context.user) {
        const client = await Client.create({ businessName, contactName, contactEmail, locations });

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
    addResult: async (parent, { reportId, equipmentId, result, comment }) => {
      const resultAdded = await Result.create({ reportId, equipmentId, result, comment });
      return resultAdded;
    },
    editUser: async (parent, { username, role }, context) => {
      const user = await User.findOneAndUpdate(
        { username },
        { role },
        { new: true }
      );
      return user;
    },
    // DB Seeding and collection cleaning mutations
    seed: async () => {
      const result = await seedDatabase();
      return result;
    },
    cleanReportsAndResults: async () => {
      const result = await cleanReportsAndResults();
      return result;
    },
    // --------------------------------------------------------------
    removeEquipment: async (parent, { equipmentId }, context) => {
      if (context.user) {
        const equipment = await Equipment.findOneAndDelete({
          _id: equipmentId,
        });
      }
    },
    editEquipment: async (parent, { equipmentId, equipmentName }, context) => {
      if (context.user) {
        const equipment = await Equipment.findOneAndUpdate({
          _id: equipmentId
        }, {
          equipmentName: equipmentName
        },
        { new: true}
      )
        return equipment
      }
    },
    addLocation: async (parent, { clientId, locationName, address, accessInstructions }, context) => {
      //if (context.user) {
        const location = await Location.create({
          locationName,
          address,
          accessInstructions
        });

        await Client.findOneAndUpdate(
          { _id: clientId },
          { $addToSet: { locations: location._id } }
        );

        return location;
      //throw AuthenticationError;
      //('You need to be logged in!');
    },
    createReport: async (parent, { roomId, assignedStaff }, context) => {

      const user = await User.findOne({ username: assignedStaff });
      if (!user) {
        throw new Error('User not found');
      }
      const report = await Report.create({
        roomId,
        assignedStaff: user._id
      });
      return report;
    },
    submitReport: async (parent, { reportId, results, generalComments, inspectionDate }, context) => {
      if (context.user) {
        const report = await Report.findByIdAndUpdate(
          reportId,
          {
            $set: { generalComments: generalComments, inspectionDate: inspectionDate, results: results }
          },
          { new: true }
        );
        return report;
      }
    },
    deleteReportResults: async (parent, { reportId }, context) => {
      if (context.user) {
        const numberDeleted = await Result.deleteMany({ reportId: reportId });
        return numberDeleted;
      }
    },
    updateRoomLastInspectionDate: async (parent, { roomId, lastInspectionDate }, context) => {
      if (context.user) {
        const room = await Room.findOneAndUpdate({
          _id: roomId
        }, {
          $set: { lastInspectionDate: lastInspectionDate }
        })
        return room;
      }
    },
    addRoom: async (parent, { roomName, inspectionCycleLength, equipment, locationId }, context) => {
      if (context.user) {
        const room = await Room.create({
          roomName,
          inspectionCycleLength,
          equipment
        });

        await Location.findOneAndUpdate(
          { _id: locationId },
          { $addToSet: { rooms: room._id} }
        );

        return room;
      }
      throw AuthenticationError;
    },
  }
};

module.exports = resolvers;