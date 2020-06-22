import { graphql } from 'react-relay';

export const SignUpUser = graphql`
  mutation SignUpMutation(
    $email: String!
    $password: String!
    $name: String
    $statusMessage: String
  ) {
    signUp(
      user: {
        email: $email
        password: $password
        name: $name
        statusMessage: $statusMessage
      }
    ) {
      token
      user {
        id
        email
        name
        photoURL
      }
    }
  }
`;
