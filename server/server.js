// packages
const next = require('next')
const express = require('express')
const bodyParser = require('body-parser')
const { ApolloServer, gql } = require('apollo-server-express')

// our packages
const mongoDB = require('./services/mongodb')

// next.js setup
const port = parseInt(process.env.PORT, 10) || 3000
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

const typeDefs = gql`
  type Query {
    hello: String
  }
`;

const resolvers = {
  Query: {
    hello: () => 'Hello world!',
  },
};

app.prepare().then(() => {
  mongoDB().then(async () => {
    const server = express()
    const as = new ApolloServer({ typeDefs, resolvers })
    as.applyMiddleware({ app: server })
  
    server.all('*', (req, res) => handle(req, res))
    server.listen(port, err => {
      if (err) throw err
      console.log(`> Ready on http://localhost:${port}`)
    })
  })
})

