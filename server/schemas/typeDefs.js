//Delete Thought and Comment typedefs

const typeDefs = `
  type User {
    _id: ID
    username: String
    email: String
    password: String
    role: String
    thoughts: [Thought]!
  }

  type Thought {
    _id: ID
    thoughtText: String
    thoughtAuthor: String
    createdAt: String
    comments: [Comment]!
  }

  type Comment {
    _id: ID
    commentText: String
    commentAuthor: String
    createdAt: String
  }

  type Room {
    _id: ID
    roomName: String
    location: Location
    equipment: [Equipment]
    lastInspectionDate: Int
    inspectionCycleLength: Int
  }

  type Location {
    _id: ID
    locationName: String
    address: String
    accessInstructions: String
    client: Client
  }

  type Client {
    _id: ID
    businessName: String
    contactName: String
    contactEmail: String
    locations: [Location]
  }

  type Equipment {
    _id: ID
    equipmentName: String!
  }

  type Report {
    _id: ID!
    roomId: Room
    assignedStaff: User
    results: [Result]
    generalComments: String
    inspectionDate: Int
  }

  type Result {
    _id: ID!
    reportId: Report
    equipmentId: Equipment
    result: Boolean
    comment: String
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    users: [User]
    user(username: String!): User
    thoughts(username: String): [Thought]
    thought(thoughtId: ID!): Thought
    me: User
    clients: [Client]
    equipmentItems: [Equipment]
    allRooms: [Room]
    room(id: ID!): Room
    roomEquipment(id: ID!): Room
    allStaff: [User]
    allLocations: [Location]
    roomByLocation(name: String!): [Room]
    allReports: [Report]
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!, role: String!): Auth
    login(email: String!, password: String!): Auth
    addThought(thoughtText: String!): Thought
    addComment(thoughtId: ID!, commentText: String!): Thought
    removeThought(thoughtId: ID!): Thought
    removeComment(thoughtId: ID!, commentId: ID!): Thought
    addClient(businessName: String!, contactName: String!, contactEmail: String!): Client
    addEquipment(equipmentName: String!): Equipment
    seed: String
    removeEquipment(equipmentId: ID): Equipment
    editUser(username: String, role: String!): User
    editEquipment(equipmentId: ID, equipmentName: String): Equipment
    addLocation(locationName: String, address: String, accessInstructions: String, client: String): Location
    createReport(roomId: String, assignedStaff: String): Report
  }
`;

//Remove queries: thoughts, thought, and me
//Remove mutation: addThought, addComment, removeThought, removeComment

module.exports = typeDefs;
