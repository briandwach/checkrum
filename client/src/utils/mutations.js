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
  mutation addClient($businessName: String!, $contactName: String!, $contactEmail: String!, $locations: String) {
    addClient(businessName: $businessName, contactName: $contactName, contactEmail: $contactEmail, locations: $locations) {
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

export const SEED = gql`
  mutation seed {
    seed 
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