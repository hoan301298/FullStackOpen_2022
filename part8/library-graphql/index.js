const { ApolloServer, gql, UserInputError, AuthenticationError } = require('apollo-server')
require('dotenv').config()
const mongoose = require('mongoose')
const Author = require('./models/Author')
const Book = require('./models/Book')
const User = require('./models/User')
const jwt = require('jsonwebtoken')

const { PubSub } = require("graphql-subscriptions");
const pubsub = new PubSub();

const MONGODB_URI = process.env.MONGODB_URI
const JWT_SECRET = process.env.JWT_SECRET
const PASSWORD = process.env.PASSWORD

mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })


const typeDefs = gql`
  input AuthorInput {
    name: String!,
    born: Int
  }

  type User {
    username: String!,
    favoriteGenre: String!
    id: ID!,
  }

  type Books {
    title: String!,
    published: Int!,
    author: Authors!,
    id: String!,
    genres: [String!]!
  }

  type Authors {
    name: String!,
    id: String!,
    born: Int,
    booksCount: Int
  }

  type Token {
    value: String!
  }

  type Query {
    authorCount: Int!
    bookCount: Int!
    allBooks (author: String, genre: String): [Books!]!
    allAuthors: [Authors!]!,
    me: User
  }

  type Mutation {
    addBook(
      title:String!
      author:AuthorInput!
      published:Int!
      genres: [String!]!
    ): Books
    editAuthor(
      name:String!,
      setBornTo:Int!
    ):Authors
    createUser(
      username: String!
      favoriteGenre: String!
    ): User
    login(
      username: String!
      password: String!
    ): Token
  }

  type Subscription {
    bookAdded: Books!
  }
`

const resolvers = {
  Query: {
    authorCount: () => Author.collection.countDocuments(),
    bookCount: () => Book.collection.countDocuments(),
    allBooks: async (root, args) => {
      if(args.author) {
        const needAuthor = await Author.find({name: args.author})
        if(needAuthor) {
          if(args.genre) {
            return await Book.find({
              author: needAuthor,
              genres: {$in : [args.genre]}
            }).populate('author')
          }
          return await Book.find({
            author: needAuthor
          }).populate('author')
        }
      }
      if(args.genre) {
        return await Book.find({
          genres: {$in: [args.genre]}
        }).populate('author')
      }
      return await Book.find({}).populate('author')
    },
    allAuthors: async () => {
      return await Author.find({})
    },
    me: (root, args, context) => {
      return context.currentUser
    }
  },
  Authors: {
    booksCount: async (root) => {
      const books = await Book.find({}).populate('author')
      const authors = books.map(book => book.author)
      return authors.filter(author => author.name === root.name).length
    }
  },
  Mutation: {
    addBook: async (root, args, context) => {
      const curUser = context.currentUser
      if(!curUser) throw new AuthenticationError("not authenticated")
      try {
        let author = await Author.findOne({name: args.author.name})
        if(!author) {
          const newAuthor = new Author({
            ...args.author
          })
          if(args.author.name.length < 3) throw new UserInputError("The author name is too short")
          await newAuthor.save()
          author = newAuthor
        }
        let book = new Book({
          title: args.title,
          published: args.published,
          author: author,
          genres: args.genres
        })
        if(args.title.length < 3) {
          throw new UserInputError("The title is too short")
        }

        pubsub.publish("BOOK_ADDED", { bookAdded: book})

        return book
      } catch (error) {
        throw new UserInputError("The title is already existed")
      }
    },
    editAuthor: async (root, args, context) => {
      const curUser = context.currentUser
      if(!curUser) throw new AuthenticationError("not authenticated")
      const author = await Author.findOne({ name: args.name})
      console.log(author)
      author.born = args.setBornTo
      return await author.save()
    },
    createUser: async (root, args) => {
      try {
      if(args.username.length < 3) throw new UserInputError("Username is too short")
      const user = new User({
        username: args.username,
        favoriteGenre: args.favoriteGenre
      })
      return await user.save()
      } catch (error) {
        throw new UserInputError("Username must be unique")
      }
    },
    login: async (root, args) => {
        const user = await User.findOne({ username: args.username })
    
        if ( !user || args.password !== PASSWORD ) {
          throw new UserInputError("wrong credentials")
        }
    
        const userForToken = {
          username: user.username,
          id: user._id,
        }
    
        return { value: jwt.sign(userForToken, JWT_SECRET) }
      }
    },
    Subscription: {
      bookAdded: {
        subscribe: () => pubsub.asyncIterator(["BOOK_ADDED"]),
      },
    },
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null
    if (auth && auth.toLowerCase().startsWith('bearer ')) {
      const decodedToken = jwt.verify(
        auth.substring(7), JWT_SECRET
      )
      const currentUser = await User.findById(decodedToken.id)
      return { currentUser }
    }
  }
})

server.listen().then(({ url, subscriptionUrl }) => {
  console.log(`Server ready at ${url}`)
  console.log(`Subcriptions ready at ${subscriptionUrl}`)
})