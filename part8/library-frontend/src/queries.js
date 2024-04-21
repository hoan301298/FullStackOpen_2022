import { gql } from '@apollo/client'

export const ALL_BOOKS = gql`
    query Query {
      allBooks {
        title
        published
        author {
          name
          born
          booksCount
        }
        id
        genres
      }
    }
`

export const CREATE_BOOK = gql`
mutation createBook ($title: String!, $author: AuthorInput!, $numPublished: Int!, $genres:[String!]!) { 
  addBook(
    title: $title,
    author: $author,
    published: $numPublished,
    genres: $genres
  ) {
    title
    published
    author {
      name
      born
    }
    id
    genres
  }
}`

export const ALL_AUTHORS = gql`
query Query {
  allAuthors {
    name
    born
    booksCount
    id
  }
}  
`

export const EDIT_AUTHOR = gql`
mutation editYear($nameVal: String!, $numYear: Int!) {
  editAuthor(name: $nameVal, setBornTo: $numYear) {
    name
    born
    booksCount
  }
}
`

export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password)  {
      value
    }
  }
`

export const ME = gql`
  query {
    me {
      username
      favoriteGenre
    }
  }
`

export const ALL_BOOKS_BY_REC = gql`
  query all_by_rec($genre: String!) {
    allBooks(genre: $genre) {
      title
        published
        author {
          name
          born
          booksCount
        }
        id
        genres
    }
  }
`
