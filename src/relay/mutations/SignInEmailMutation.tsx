import { graphql } from 'react-relay';

export const SignInEmail = graphql`
  mutation SignInEmailMutation($email: String!, $password: String!) {
    signInEmail(email: $email, password: $password) {
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
