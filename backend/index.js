const express = require('express');
const json = require('./data.json');
const app = express();
const { PORT } = require('./env');

app.get('/api', (req, res) => {
    res.send(json.data);
})

app.listen(process.env.PORT || PORT);
console.log(`Server listens on Port ${PORT}`)