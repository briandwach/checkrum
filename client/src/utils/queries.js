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
    inspectionCycleLength
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
  query getClient($businessName: String!) {
    getClient(businessName: $businessName) {
      _id
      businessName
      contactName
      contactEmail
      locations {
        _id
        locationName
        address
        accessInstructions
        client
      }
    }
  }

`;