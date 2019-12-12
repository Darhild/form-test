const express = require('express');
const path = require('path');
const json = require('./data.json');
const app = express();
const { PORT } = require('./env');

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

app.use(express.static(path.resolve(__dirname, "../client/dist")));

app.get("*", function(req, res) {
  response.sendFile(path.resolve(__dirname, "../client/dist", "index.html"));
});

app.get('/api', (req, res) => {
    res.send(json.data);
})

app.listen(process.env.PORT || PORT);
console.log(`Server listens on Port ${PORT}`)
