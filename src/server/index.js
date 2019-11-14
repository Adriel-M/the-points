const path = require('path');
const express = require('express');
const graphqlHTTP = require('express-graphql');

const Schema = require('./Schema');

const app = express();

const clientBuildPath = path.resolve(__dirname, '../../build');

app.use(express.static(clientBuildPath));

const port = process.env.PORT || 3000;

app.use('/api', graphqlHTTP({
  schema: Schema,
  graphiql: true,
}));

app.get('*', (_, res) => {
  res.sendFile(path.resolve(clientBuildPath, 'index.html'));
});

app.listen(port, () => {
  console.log(`Listening on port: ${port}`);
});
