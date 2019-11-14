const {
  GraphQLSchema,
} = require('graphql');

const QueryRoot = require('./QueryRoot');

const Schema = new GraphQLSchema({
  query: QueryRoot,
});

module.exports = Schema;
