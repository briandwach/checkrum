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

export const ADD_THOUGHT = gql`
  mutation addThought($thoughtText: String!) {
    addThought(thoughtText: $thoughtText) {
      _id
      thoughtText
      thoughtAuthor
      createdAt
      comments {
        _id
        commentText
      }
    }
  }
`;

export const ADD_COMMENT = gql`
  mutation addComment($thoughtId: ID!, $commentText: String!) {
    addComment(thoughtId: $thoughtId, commentText: $commentText) {
      _id
      thoughtText
      thoughtAuthor
      createdAt
      comments {
        _id
        commentText
        createdAt
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