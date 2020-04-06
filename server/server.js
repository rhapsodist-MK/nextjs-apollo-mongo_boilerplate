// packages
import next from 'next'
import express from 'express'
import { ApolloServer, gql } from 'apollo-server-express'
import bodyParser from 'body-parser'

// our packages
import mongoDB from './services/mongodb'

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
    
    server.get('/', (req, res) => {
      return app.render(req, res, '/', req.query)
    })

    server.use('/about', require('./routes/about'))
    
    as.applyMiddleware({ app: server })
    server.all('*', (req, res) => {
      return app.render(req, res, req.target_nextApp, req.query)
      handle(req, res)
    })
    server.listen(port, err => {
      if (err) throw err
      console.log(`> Ready on http://localhost:${port}`)
    })
  })
})

