import { gql } from "@apollo/client";

export const ADD_GROUPCHAT = gql`
  mutation addGroupChat($email: String!, $info: createGroupChatInput!) {
    groupChat: addGroupChat(email: $email, info: $info) {
      name
    }
  }
`;

export const GET_GROUPCHAT = gql`
  query getGroupChat($id: String!) {
    getGroupChat(id: $id) {
      id
      name
      description
      links
      image
    }
  }
`;

export const GET_GROUPCHATS = gql`
  query getGroupChats {
    groupChats: getGroupChats {
      groupChats {
        name
        description
        links
        image
        id
        isCommunity
      }
      totalPages
      pageNumber
    }
  }
`;

export const GET_GROUPCHAT_IDS = gql`
  query getAllGroupChatIds {
    getAllGroupChatIds {
      groupChats
    }
  }
`;

export const SEARCH_GROUPCHATS = gql`
  query searchGroupChats($page: Float, $text: String, $isCommunity: Boolean) {
    groupChats: searchGroupChats(
      page: $page
      text: $text
      isCommunity: $isCommunity
    ) {
      groupChats {
        name
        description
        links
        id
      }
      totalPages
      pageNumber
    }
  }
`;

export const ADVANCED_SEARCH_GROUPCHATS = gql`
  query searchGroupChats(
    $campus: String
    $department: String
    $code: String
    $term: String
    $year: String
  ) {
    groupChats: searchGroupChats(
      campus: $campus
      department: $department
      code: $code
      term: $term
      year: $year
    ) {
      groupChats {
        name
        description
        links
        id
      }
    }
  }
`;

export const UPDATE_GROUPCHAT_IMAGE = gql`
  mutation updateGroupChat($id: String!, $image: String!) {
    updateGroupChat(id: $id, image: $image) {
      name
      id
    }
  }
`;

export const UPDATE_GROUPCHAT_STATUS = gql`
  mutation updateGroupChat($id: String!, $status: String!) {
    updateGroupChat(id: $id, status: $status) {
      name
      id
    }
  }
`;

export default {
  ADD_GROUPCHAT,
  GET_GROUPCHAT,
  GET_GROUPCHATS,
  GET_GROUPCHAT_IDS,
  SEARCH_GROUPCHATS,
  ADVANCED_SEARCH_GROUPCHATS,
  UPDATE_GROUPCHAT: UPDATE_GROUPCHAT_STATUS,
};
