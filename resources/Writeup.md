# Motivation

Instead of serving the whole dataset in the webapp, I decided to have both a
frontend and backend component. No specific reason on why `graphql` was used;
just wanted to try something new.

## The App

The app is separated into two groups: The `React` frontend and an `Express`
backend.

### Frontend

The frontend is just a single page application which only shows the stats of
players. It's broken down into three components: `Home`, `TopBar` and
`PlayerTable`.

#### Home

This component is more of a container that holds all the components and
all the state for the app. Also handles the fetching logic from the backend.

### TopBar

This component contains the the controls for sorting, searching, and
downloading the data.

#### PlayerTable

This component contains the display for the stats and also controls which page
to show.

### Backend

The backend is just an express server with a `graphql` endpoint. It has two
components: `RushingStore` and `Schema`.

#### RushingStore

This is in charge of reading the `rushing.json` and storing the data. It also
separates off the `Lng` stat into two fields: `longGain` and `longGainT` so it's
sortable. It also processes `Yds` into an int as it was a comma delimited
string. A `Trie` datastructure was used to support autosuggestions.

#### Schema

This is in charge of creating the `graphql` schema for the api endpoint which
includes the resolvers as well. The `playersResolver` fetches the data from
`RushingStore`, sorts, handles the pagination, and sends off suggestions.