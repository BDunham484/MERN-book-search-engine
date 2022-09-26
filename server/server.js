const express = require('express');
//import ApolloServer
const { ApolloServer } = require('apollo-server-express');
//import typeDefs and resolvers
const { typeDefs, resolvers } = require('./schemas');
const path = require('path');
const db = require('./config/connection');
const routes = require('./routes');
const { authMiddleware } = require('./utils/auth');


const app = express();
const PORT = process.env.PORT || 3001;
//create a new Apollo server and pass in our schema data
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: authMiddleware
});

app.use(express.urlencoded({ extended: false }));
app.use(express.json());





//create a new instance of an Apollo server with the GraphQL schema
const startApolloServer = async (typeDefs, resolvers) => {
  await server.start();
  //integrate our Apollo server with the Express app as middleware
  server.applyMiddleware({ app });

  // if we're in production, serve client/build as static assets
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}

app.use(routes);

  db.once('open', () => {
    app.listen(PORT, () => {
      console.log(`🌍 Now listening on localhost:${PORT}`)
      //log where we can go to test our GQL API
      console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
    });
  });
};

//call the async function to start the server
startApolloServer(typeDefs, resolvers);




