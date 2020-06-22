import { graphql } from 'react-relay';

export const AuthUser = graphql`
  query AuthUserQuery {
    me {
      id
      email
      name
      photoURL
    }
  }
`;
