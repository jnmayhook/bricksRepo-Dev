import { gql } from '@apollo/client';

export const GET_ME = gql `
query Query {
  me {
    username
    savedSets {
      Name
      Item_Number
      Subtheme
      Year
      Image_URL
    }
  }
}
`;

export const GET_SET = gql `
query getSet($Name: String!) {
  set(Name: $Name) {
    _id
    Item_Number
    Name
    Year
    Theme
    Subtheme
    Pieces
    Minifigures
    Image_URL
  }
}
`;
