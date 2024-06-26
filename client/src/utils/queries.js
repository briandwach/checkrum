import { gql } from '@apollo/client';

export const QUERY_CLIENT = gql`
  query clients {
    clients {
      _id
      businessName
      contactName
      contactEmail
      locations {
        _id
        address
      }
    }
  }
`;

export const QUERY_EQUIPMENT = gql`
  query equipmentItems {
    equipmentItems {
      _id
      equipmentName
    }
  }
`;

export const QUERY_ALL_ROOMS = gql`
query AllRooms {
  allRooms {
    _id
    roomName
    location {
      _id
      locationName
      address
      accessInstructions
      client {
        _id
        businessName
      }
    }
    lastInspectionDate
    inspectionCycleLength
    dateTimeProperties {
      inspectionStatus
      timeToUpcomingDueDate
      upcomingDueDate
      missedCycles
      initialMissedDate
    }
  }
}
`;

export const QUERY_SINGLE_ROOM = gql`
query Room($id: ID!) {
  room(id: $id) {
    _id
    roomName
    location {
      _id
      locationName
      address
      accessInstructions
      client {
        _id
        businessName
      }
    }
    inspectionCycleLength
    equipment {
      _id
      equipmentName
    }
  }
}
`;

export const QUERY_SINGLE_ROOM_EQUIPMENT = gql`
query RoomEquipment($id: ID!) {
  roomEquipment(id: $id) {
    equipment {
      _id
      equipmentName
    }
  }
}
`;

//Mutation to find all staff members. Used to populate the staff list in the View Staff/Create Report component. -dh
export const ALL_STAFF = gql`
query AllStaff {
  allStaff {
    _id
    username
    role
    email
  }
}
`;

//Mutation to find all locations. Used to populate the location list in the Create Report component. -dh
export const ALL_LOCATIONS = gql`
query AllLocations {
  allLocations {
    locationName
  }
}
`;

export const ROOM_BY_LOCATION = gql`
query RoomByLocation($name: String!) {
  roomByLocation(name: $name) {
    _id
    roomName
    inspectionCycleLength
    lastInspectionDate
    dateTimeProperties {
      initialMissedDate
      missedCycles
      inspectionStatus
      timeToUpcomingDueDate
      upcomingDueDate
    }
  }
}
`;

export const ALL_REPORTS = gql`
query AllReports {
  allReports {
    assignedStaff {
      username
    }
    roomId {
      roomName
    }
  }
}
`;

export const IN_PROGRESS_REPORTS = gql`
query Query {
  inProgressReports {
    _id
    assignedStaff {
      _id
      username
    }
    roomId {
      _id
      roomName
      location {
        client {
          _id
          businessName
        }
        _id
        locationName
        address
      }
      lastInspectionDate
      inspectionCycleLength
      dateTimeProperties {
        inspectionStatus
        timeToUpcomingDueDate
        upcomingDueDate
        missedCycles
        initialMissedDate
      }
    }
  }
}
`;

export const COMPLETED_REPORTS = gql`
query Query {
  completedReports {
    _id
    failStatus
    assignedBy {
      username
    }
    assignedStaff {
      _id
      username
    }
    lastUpdated 
    lastUpdatedBy
    results {
      equipmentId {
        equipmentName
      }
      result
      comment
    }
    inspectionDate
    generalComments
    roomId {
      _id
      roomName
      location {
        client {
          _id
          businessName
        }
        _id
        locationName
      }
      inspectionCycleLength
    }
  }
}
`;

export const QUERY_SINGLE_CLIENT = gql`
  query getClient($id: ID) {
    getClient(id: $id) {
      _id
      businessName
      contactName
      contactEmail
      locations {
        _id
        locationName
        address
        accessInstructions
      }
    }
  }

`;

export const QUERY_LOCATION = gql`
query locations {
  locations {
    _id
    locationName
    address
    accessInstructions
    client {
      _id
    }
  }
}
`;

export const ASSIGNED_REPORTS_BY_STAFF = gql`
query Query($assignedStaff: ID!) {
  assignedReportsByStaff(assignedStaff: $assignedStaff) {
    _id
    assignedBy {
      username
    }
    roomId {
      _id
      roomName
      location {
        client {
          _id
          businessName
        }
        _id
        locationName
        address
      }
      lastInspectionDate
      inspectionCycleLength
      dateTimeProperties {
        inspectionStatus
        timeToUpcomingDueDate
        upcomingDueDate
        missedCycles
        initialMissedDate
      }
    }
  }
}
`;

export const COMPLETED_REPORTS_BY_STAFF = gql`
query Query($assignedStaff: ID!) {
  completedReportsByStaff(assignedStaff: $assignedStaff) {
    _id
    assignedStaff {
      username
    }
    assignedBy {
      username
    }
    results {
      equipmentId {
        equipmentName
      }
      result
      comment
    }
    inspectionDate
    generalComments
    roomId {
      _id
      roomName
      location {
        client {
          _id
          businessName
        }
        _id
        locationName
      }
      inspectionCycleLength
    }
  }
}
`;

export const ROOM_INFO_BY_REPORT_ID = gql`
query Query($id: ID!) {
  roomInfoByReportId(id: $id) {
    _id
    assignedBy {
      username
    }
    assignedStaff {
      username
    }
    roomId {
      _id
      roomName
      location {
        client {
          _id
          businessName
        }
        _id
        locationName
        address
      }
      lastInspectionDate
      inspectionCycleLength
      equipment {
        _id
        equipmentName
      }
    }
  }
}
`;

export const RESULT_DATA_BY_REPORT_ID = gql`
query Query($id: ID!) {
  resultDataByReportId(id: $id) {
    _id
    assignedStaff {
      username
    }
    results {
      equipmentId {
        _id
      }
      result
      comment
    }
    generalComments
    inspectionDate
    lastUpdated
    lastUpdatedBy 
  }
}
`;

export const QUERY_ROOM = gql`
query rooms {
  rooms {
    _id
    roomName
    location {
      _id
    }
    equipment {
      _id
      equipmentName
    }
    lastInspectionDate
    inspectionCycleLength
  }
}
`;

export const QUERY_LOCATION_REVISED = gql`
query locationsRevised {
  locationsRevised {
    _id
    businessName
    contactName
    contactEmail
    locations {
      _id
      locationName
      address
      accessInstructions
      rooms {
        _id
        roomName
        lastInspectionDate
        inspectionCycleLength
        equipment {
          _id
          equipmentName
        }
      }
    }
  }
}
`;