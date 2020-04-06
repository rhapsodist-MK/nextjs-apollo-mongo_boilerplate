// packages
const next = require('next')
const express = require('express')
// const { graphqlExpress, graphiqlExpress } = require('apollo-server-express')
const bodyParser = require('body-parser')

const { ApolloServer, gql } = require('apollo-server-express')

// our packages
// const schema = require('./graphql/schema')

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

// Provide resolver functions for your schema fields
const resolvers = {
  Query: {
    hello: () => 'Hello world!',
  },
};

app.prepare().then(() => {
  
  // server.use('/graphql', bodyParser.json(), graphqlExpress({ schema }))
  // server.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql'}))
  
  const as = new ApolloServer({ typeDefs, resolvers });
  
  const server = express()
  as.applyMiddleware({ app: server });

  server.all('*', (req, res) => handle(req, res))

  server.listen(port, err => {
    if (err) throw err
    console.log(`> Ready on http://localhost:${port}`)
  })
})

