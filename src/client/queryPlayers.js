import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';

export const GET_PLAYERS = gql`
  query Players($filter: String, $offset: Int, $limit: Int, $sortBy: String) {
    getPlayers(filter: $filter, offset: $offset, limit: $limit, sortBy: $sortBy) {
      players {
        name
        team
        position
        attempts
        attemptsPerGame
        yards
        average
        yardsPerGame
        touchDown
        longGain
        first
        firstPercentage
        twentyPlus
        fourtyPlus
        fumbles
      }
      totalCount
      suggestions
    }
  }
`;

const queryPlayers = ({
  filter, offset, limit, sortBy,
}) => (
  useQuery(GET_PLAYERS, {
    variables: {
      filter,
      offset,
      limit,
      sortBy,
    },
  })
);

export default queryPlayers;
