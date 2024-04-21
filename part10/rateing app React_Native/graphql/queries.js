import { gql } from '@apollo/client'
import { REPO_DETAILS } from './fragments'

export const GET_REPOS = gql`
    ${REPO_DETAILS}
    query getRepos(
        $orderBy: AllRepositoriesOrderBy
        $orderDirection: OrderDirection
        $filter: String
        $first: Int
        $after: String
    ) {
        repositories(orderBy: $orderBy, orderDirection: $orderDirection, searchKeyword: $filter, first: $first, after: $after) {
            totalCount
            edges {
                node {
                    ...RepoDetails
                }
                cursor
            }
            pageInfo {
                endCursor
                startCursor
                hasNextPage
            }
        }
    }
`

export const CHECK_USER = gql`
    query {
        authorizedUser {
            id
            username
        }
    }
`

export const SPECIFIC_REPO = gql`
    ${REPO_DETAILS}
    query getRepository($id: ID!) {
        repository(id: $id) {
          ...RepoDetails
          reviews {
              edges {
                  node {
                      id
                      text
                      rating
                      createdAt
                      user {
                          id
                          username
                      }
                  }
              }
          }
    }
}
`