const express = require("express");
var app = express();

app.use(express.json());

app.use('/api/', require('./routes/elastic-search'));
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log('Server Listening on port : ', PORT);
})
