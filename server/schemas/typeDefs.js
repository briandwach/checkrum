const typeDefs = `

scalar DateTime

  type User {
    _id: ID
    username: String
    email: String
    password: String
    role: String
  }

  type Room {
    _id: ID
    roomName: String
    location: Location
    equipment: [Equipment]
    lastInspectionDate: DateTime
    inspectionCycleLength: String!
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
    clients: [Client]
    equipmentItems: [Equipment]
    allRooms: [Room]
    room(id: ID!): Room
    roomEquipment(id: ID!): Room
    allStaff: [User]
    allLocations: [Location]
    roomByLocation(name: String!): [Room]
    allReports: [Report]
    inProgressReports: [Report]
    completedReports: [Report]
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
    addRoom(locationId: ID, roomName: String!, inspectionCycleLength: String, equipment: [String]): Room
    editRoom(roomId: ID, roomName: String, inspectionCycleLength: String, equipment: [String]): Room
    editLocation(locationId: ID, locationName: String, address: String, accessInstructions: String): Location
    editClient(clientId: ID, businessName: String, contactName: String, contactEmail: String): Client
  }
`;


module.exports = typeDefs;
