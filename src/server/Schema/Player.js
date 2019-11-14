const {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLString,
  GraphQLInt,
  GraphQLFloat,
} = require('graphql');

const Player = new GraphQLObjectType({
  name: 'Player',
  fields: {
    name: {
      type: new GraphQLNonNull(GraphQLString),
      resolve: (parent) => parent.name,
    },
    team: {
      type: new GraphQLNonNull(GraphQLString),
      resolve: (parent) => parent.team,
    },
    position: {
      type: new GraphQLNonNull(GraphQLString),
      resolve: (parent) => parent.position,
    },
    attempts: {
      type: new GraphQLNonNull(GraphQLInt),
      resolve: (parent) => parent.attempts,
    },
    attemptsPerGame: {
      type: new GraphQLNonNull(GraphQLFloat),
      resolve: (parent) => parent.attemptsPerGame,
    },
    yards: {
      type: new GraphQLNonNull(GraphQLInt),
      resolve: (parent) => parent.yards,
    },
    average: {
      type: new GraphQLNonNull(GraphQLFloat),
      resolve: (parent) => parent.average,
    },
    yardsPerGame: {
      type: new GraphQLNonNull(GraphQLFloat),
      resolve: (parent) => parent.yardsPerGame,
    },
    touchDown: {
      type: new GraphQLNonNull(GraphQLInt),
      resolve: (parent) => parent.touchDown,
    },
    longGain: {
      type: new GraphQLNonNull(GraphQLString),
      resolve: (parent) => {
        const suffix = parent.longGainT ? 'T' : '';
        return `${parent.longGain}${suffix}`;
      },
    },
    first: {
      type: new GraphQLNonNull(GraphQLInt),
      resolve: (parent) => parent.first,
    },
    firstPercentage: {
      type: new GraphQLNonNull(GraphQLFloat),
      resolve: (parent) => parent.firstPercentage,
    },
    twentyPlus: {
      type: new GraphQLNonNull(GraphQLInt),
      resolve: (parent) => parent.twentyPlus,
    },
    fourtyPlus: {
      type: new GraphQLNonNull(GraphQLInt),
      resolve: (parent) => parent.fourtyPlus,
    },
    fumbles: {
      type: new GraphQLNonNull(GraphQLInt),
      resolve: (parent) => parent.fumbles,
    },
  },
});

module.exports = Player;
