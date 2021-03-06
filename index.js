const express = require('express')
const { ApolloServer } = require('apollo-server-express')
const expressPlayground = require('graphql-playground-middleware-express').default
const { readFileSync } = require('fs')

var typeDefs = readFileSync('./typeDefs.graphql', 'UTF-8')
const resolvers = require('./resolvers')

async function start() {
    const app = express()

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
    const server = new ApolloServer({ typeDefs, resolvers });

    await server.start();
    server.applyMiddleware({ app })

    app.get('/',(req, res) => res.end(`Welcome to the PhotoShare API`))
    app.get('/playground', expressPlayground({ endpoint: '/graphql' }))

    app.listen({ port: 4000 }, () =>
        console.log(`GraphQL Server running at http://localhost:4000${server.graphqlPath}`)
    )
}

start()





