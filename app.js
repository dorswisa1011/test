const routes = require('./routers/routes');
const express = require("express");

const app = express();
const PORT = 3000;

app.use('/github_api', routes);
app.listen({port: 3000 || PORT}, () =>
    console.log('Now browse to http://localhost:' + PORT)
);
