const {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLList,
  GraphQLString,
  GraphQLInt,
} = require('graphql');

const Player = require('./Player');
const playersResolver = require('./playersResolver');

const GetPlayers = new GraphQLObjectType({
  name: 'GetPlayers',
  fields: {
    players: {
      type: new GraphQLNonNull(GraphQLList(Player)),
      resolve: (parent) => parent.players,
    },
    totalCount: {
      type: new GraphQLNonNull(GraphQLInt),
      resolve: (parent) => parent.totalCount,
    },
    suggestions: {
      type: new GraphQLNonNull(GraphQLList(GraphQLString)),
      resolve: (parent) => parent.suggestions,
    },
  },
});

const QueryRoot = new GraphQLObjectType({
  name: 'QueryRoot',
  fields: {
    getPlayers: {
      type: new GraphQLNonNull(GetPlayers),
      args: {
        filter: { type: GraphQLString },
        limit: { type: GraphQLInt },
        offset: { type: GraphQLInt },
        sortBy: { type: GraphQLString },
      },
      resolve: playersResolver,
    },
  },
});

module.exports = QueryRoot;
