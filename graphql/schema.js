const { makeExecutableSchema, addMockFunctionsToSchema } = require('graphql-tools')

const mocks = {
  String: () => 'It works!'
}

const typeDefs = `
  type Query {
    testString: String
  }
`

const schema = makeExecutableSchema({ typeDefs })

addMockFunctionsToSchema({schema, mocks})

module.exports =  schema