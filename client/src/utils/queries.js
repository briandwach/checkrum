import { gql } from '@apollo/client';

export const QUERY_USER = gql`
  query user($username: String!) {
    user(username: $username) {
      _id
      username
      email
      thoughts {
        _id
        thoughtText
        createdAt
      }
    }
  }
`;

export const QUERY_THOUGHTS = gql`
  query getThoughts {
    thoughts {
      _id
      thoughtText
      thoughtAuthor
      createdAt
    }
  }
`;

export const QUERY_SINGLE_THOUGHT = gql`
  query getSingleThought($thoughtId: ID!) {
    thought(thoughtId: $thoughtId) {
      _id
      thoughtText
      thoughtAuthor
      createdAt
      comments {
        _id
        commentText
        commentAuthor
        createdAt
      }
    }
  }
`;

export const QUERY_ME = gql`
  query me {
    me {
      _id
      username
      email
      thoughts {
        _id
        thoughtText
        thoughtAuthor
        createdAt
      }
    }
  }
`;

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
    overdueInspection
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

export const ALL_STAFF = gql`
query AllStaff {
  allStaff {
    _id
    username
  }
}
`;


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
    }
  }
}
`;

export const COMPLETED_REPORTS_BY_STAFF = gql`
query Query($assignedStaff: ID!) {
  completedReportsByStaff(assignedStaff: $assignedStaff) {
    _id
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
    }
  }
}
`;

export const ROOM_INFO_BY_REPORT_ID = gql`
query Query($id: ID!) {
  roomInfoByReportId(id: $id) {
    _id
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