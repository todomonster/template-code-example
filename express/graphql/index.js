// {
//     person(id: "1") {
//       id
//     }
//     hello
// }

const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');

// Define your GraphQL schema
const schema = buildSchema(`
  type Person {
    id: ID!
    name: String!
    age: Int!
  }

  type Query {
    hello: String
    person(id: ID!): Person
    people: [Person]
  }
`);

// Sample data
const peopleData = [
  { id: '1', name: 'John Doe', age: 30 },
  { id: '2', name: 'Jane Smith', age: 25 },
  { id: '3', name: 'Bob Johnson', age: 40 },
];

// Define the resolver functions
const root = {
  hello: () => {
    return 'Hello, GraphQL!';
  },
  person: ({ id }) => {
    return peopleData.find(person => person.id === id);
  },
  people: () => {
    return peopleData;
  },
};

// Create an Express application
const app = express();

// Create a route for handling GraphQL requests
app.use(
  '/graphql',
  graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true, // Enable the GraphiQL UI for testing the API
  })
);

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`GraphQL server is running at http://localhost:${PORT}/graphql`);
});
