import { gql } from '@apollo/client';
import { USER_BASE_FIELDS } from './fragments';

export const AUTHORIZE = gql`
    mutation authorize($username: String!, $password: String!) {
        authorize(credentials: { username: $username, password: $password }) {
            accessToken
        }
    }
`

export const CREATE_REVIEW = gql`
  mutation createReview($review: CreateReviewInput!) {
    createReview(review: $review) {
      repositoryId
    }
  }
`

export const SIGN_UP = gql`
  mutation createUser($user: CreateUserInput!) {
    createUser(user: $user) {
      ...userBase
    }
  }
  ${USER_BASE_FIELDS}
`