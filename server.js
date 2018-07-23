const express = require('express');
const mongoose = require("mongoose")
const bodyParser = require("body-parser")
const Poll = require("./models/poll")
require('dotenv').config()

mongoose.connect(process.env.DB_URI);
const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//retreive poll by id
app.get('/api/poll/:id', (req, res) => {
  Poll.findById(req.params.id, (err, result) => {
    if (err) {
      res.send(err);
    } else {
      res.send(result)
    }
  })
  });

  //update poll
app.put("/api/poll", function (req, res) {
  console.log(req.body.response)
  Poll.findByIdAndUpdate(req.body.id, { $pushAll: { "poll_response": [...req.body.response]} }, (err, result) => {
    if (err) {
      res.send(err)
    } else {
      res.send(result)
    }
  })

})

//create new poll
app.post("/api/poll", (req, res) => {
  console.log(req.body)
  Poll.create(req.body, function (err, result) {
    if (err) {
      res.send(err);
    } else {
      res.send(result);
    }
  })

})

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname+'/client/build/index.html'));
});
app.listen(port, () => console.log(`Listening on port ${port}`));
