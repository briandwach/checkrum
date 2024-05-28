//Delete Thought and Comment typedefs

const typeDefs = `

scalar DateTime

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
    lastInspectionDate: DateTime
    inspectionCycleLength: Int
    dateTimeProperties: DateTimeProperties
  }

  type Location {
    _id: ID
    locationName: String
    address: String
    accessInstructions: String
    client: Client
    rooms: [Room]
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
    equipmentName: String
  }

  type Report {
    _id: ID!
    roomId: Room
    assignedStaff: User
    results: [Result]
    generalComments: String
    inspectionDate: DateTime
  }

  type Result {
    _id: ID!
    reportId: Report
    equipmentId: Equipment
    result: Boolean
    comment: String
  }

  type DeleteReportResultsResponse {
    deletedCount: Int!
  }

  type DateTimeProperties {
    upcomingDueDate: DateTime
    timeToUpcomingDueDate: String
    overdueStatus: Boolean
    missedCycles: Int
    initialMissedDate: DateTime
  }

  type Auth {
    token: ID!
    user: User
  }

  input ClientInput {
    _id: ID
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
    getClient(id: ID): Client
    locations: [Location]
    rooms: [Room]
    assignedReportsByStaff(assignedStaff: ID!): [Report]
    completedReportsByStaff(assignedStaff: ID!): [Report]
    roomInfoByReportId(id: ID!): Report
    resultDataByReportId(id: ID!): Report
    locationsRevised: [Client]
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!, role: String!): Auth
    login(email: String!, password: String!): Auth
    addThought(thoughtText: String!): Thought
    addComment(thoughtId: ID!, commentText: String!): Thought
    removeThought(thoughtId: ID!): Thought
    removeComment(thoughtId: ID!, commentId: ID!): Thought
    addClient(businessName: String!, contactName: String!, contactEmail: String!, locations: String): Client
    addEquipment(equipmentName: String!): Equipment
    seed: String
    cleanReportsAndResults: String
    removeEquipment(equipmentId: ID): Equipment
    editUser(username: String, role: String!): User
    editEquipment(equipmentId: ID, equipmentName: String): Equipment
    createReport(roomId: String, assignedStaff: String): Report
    addLocation(clientId: ID, locationName: String, address: String, accessInstructions: String): Location
    addResult(reportId: ID!, equipmentId: ID!, result: Boolean!, comment: String): Result
    deleteReportResults(reportId: ID!): DeleteReportResultsResponse
    submitReport(reportId: ID!, results: [ID]!, generalComments: String, inspectionDate: DateTime!): Report
    updateRoomLastInspectionDate(roomId: ID!, lastInspectionDate: DateTime!): Room
    addRoom(locationId: ID, roomName: String!, inspectionCycleLength: Int, equipment: [String]): Room
  }
`;

//Remove queries: thoughts, thought, and me
//Remove mutation: addThought, addComment, removeThought, removeComment

module.exports = typeDefs;
