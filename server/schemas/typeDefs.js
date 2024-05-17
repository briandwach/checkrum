//Delete Thought and Comment typedefs

const typeDefs = `
  type User {
    _id: ID
    username: String
    email: String
    password: String
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
    location: [Location]
    equipment: [Equipment]
    lastInspectionDate: Date
    inspectionCycleLength: Int
  }

  type Location {
    _id: ID
    locationName: String
    address: String
    accessInstructions: String
    client: [Client]
  }

  type Client {
    _id: ID
    businessName: String
    contactName: String
    contactEmail: String
    locations: [Location]
  }

  type Equipment {
    equipmentName: String!
  }

  type Report {
    _id: ID!
    roomName: [Room]
    assignedStaff: [User]
    inspectionDate: Date
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
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    addThought(thoughtText: String!): Thought
    addComment(thoughtId: ID!, commentText: String!): Thought
    removeThought(thoughtId: ID!): Thought
    removeComment(thoughtId: ID!, commentId: ID!): Thought
  }
`;

//Remove queries: thoughts, thought, and me
//Remove mutation: addThought, addComment, removeThought, removeComment

module.exports = typeDefs;
