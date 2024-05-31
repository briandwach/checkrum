import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
        role
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!, $role: String!) {
    addUser(username: $username, email: $email, password: $password, role: $role) {
      token
      user {
        _id
        username
        role
      }
    }
  }
`;


export const ADD_CLIENT = gql`
  mutation addClient($businessName: String!, $contactName: String!, $contactEmail: String!) {
    addClient(businessName: $businessName, contactName: $contactName, contactEmail: $contactEmail) {
      _id
      businessName
      contactName
      contactEmail
      locations {
        _id
      }
    }
  }
`;

export const ADD_EQUIPMENT = gql`
  mutation addEquipment($equipmentName: String!) {
    addEquipment(equipmentName: $equipmentName) {
      _id
      equipmentName
    }
  }
`;

export const ADD_RESULT = gql`
mutation Mutation($reportId: ID!, $equipmentId: ID!, $result: Boolean!, $comment: String) {
  addResult(reportId: $reportId, equipmentId: $equipmentId, result: $result, comment: $comment) {
    _id
    equipmentId {
      _id
    }
    reportId {
      _id
    }
    result
    comment
  }
}
`;

export const SEED = gql`
  mutation seed {
    seed 
  }
`;

export const CLEAN_REPORTS_AND_RESULTS = gql`
  mutation cleanReportsAndResults {
    cleanReportsAndResults
  }
`;


export const REMOVE_EQUIPMENT = gql`
  mutation removeEquipment($equipmentId: ID){
    removeEquipment(equipmentId: $equipmentId){
      _id
      equipmentName
    }
  }
`;

export const EDIT_EQUIPMENT = gql`
  mutation editEquipment($equipmentId: ID, $equipmentName: String){
    editEquipment(equipmentId: $equipmentId, equipmentName: $equipmentName){
      _id
      equipmentName
    }
  }
`;

export const EDIT_USER = gql`
  mutation Mutation($role: String!, $username: String) {
    editUser(role: $role, username: $username) {
      username
      role
    }
  }
`;

export const CREATE_REPORT = gql`
  mutation createReport($roomId: String, $assignedStaff: String) {
    createReport(roomId: $roomId, assignedStaff: $assignedStaff) {
      _id
    }
  }
`;

export const SUBMIT_REPORT = gql`
mutation Mutation($reportId: ID!, $results: [ID]!, $inspectionDate: DateTime!, $generalComments: String) {
  submitReport(reportId: $reportId, results: $results, inspectionDate: $inspectionDate, generalComments: $generalComments) {
    _id
    results {
      _id
    }
    generalComments
    inspectionDate
  }
}
`;

export const DELETE_REPORT_RESULTS = gql`
mutation Mutation($reportId: ID!) {
  deleteReportResults(reportId: $reportId) {
    deletedCount
  }
}
`;

export const UPDATE_ROOM_LAST_INSPECTION_DATE = gql`
mutation Mutation($roomId: ID!, $lastInspectionDate: DateTime!) {
  updateRoomLastInspectionDate(roomId: $roomId, lastInspectionDate: $lastInspectionDate) {
    _id
    lastInspectionDate
  }
}
`;

export const ADD_LOCATION = gql`
mutation addLocation($clientId: ID, $locationName: String!, $address: String!, $accessInstructions: String!) {
  addLocation(clientId: $clientId, locationName: $locationName, address: $address, accessInstructions: $accessInstructions) {
    _id
    locationName
    address
    accessInstructions
  }
}
`;

export const ADD_ROOM = gql`
mutation addRoom($locationId: ID, $roomName: String!, $inspectionCycleLength: String, $equipment: [String]) {
  addRoom(locationId: $locationId, roomName: $roomName, inspectionCycleLength: $inspectionCycleLength, equipment: $equipment) {
    _id
    roomName
    inspectionCycleLength
    equipment {
      _id
      equipmentName
    }
  }
}
`;

export const EDIT_ROOM = gql`
mutation editRoom($roomId: ID, $roomName: String!, $inspectionCycleLength: String, $equipment: [String]) {
  editRoom(roomId: $roomId, roomName: $roomName, inspectionCycleLength: $inspectionCycleLength, equipment: $equipment) {
    _id
    roomName
    inspectionCycleLength
    equipment {
      _id
      equipmentName
    }
  }
}
`;

export const EDIT_LOCATION = gql`
mutation editLocation($locationId: ID, $locationName: String!, $address: String, $accessInstructions: String) {
  editLocation(locationId: $locationId, locationName: $locationName, address: $address, accessInstructions: $accessInstructions) {
    _id
    locationName
    address
    accessInstructions
  }
}
`;

export const EDIT_CLIENT = gql`
mutation editClient($clientId: ID, $businessName: String, $contactName: String, $contactEmail: String) {
  editClient(clientId: $clientId, businessName: $businessName, contactName: $contactName, contactEmail: $contactEmail) {
    _id
    businessName
    contactName
    contactEmail
  }
}
`;