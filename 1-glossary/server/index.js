require("dotenv").config();
const express = require("express");
const path = require("path");
const db = require('./db.js');
//start server
const app = express();
//middleware
app.use(express.json());
// Serves up all static and generated assets in in a specified folder.
app.use(express.static(path.join(__dirname, '/../client/dist')));


/****
 *
 *
 * Other routes here....
 *
 *
 */
//route handlers that communicate with the DB
app.get ('/glossary', (req, res) => {
  db.Glossary.find({})
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(500).send(err);
    })
})
app.post ( '/glossary', (req, res) => {
  db.Glossary.create({'word': req.body.word, 'definition': req.body.definition})
    .then(() => {
      res.status(201).json({'message': 'Successfully added!'});
    })
    .catch((err) => {
      res.status(500).send(err);
    })
})
app.put ('/glossary', (req, res) => {
  db.Glossary.updateOne({'_id':req.body._id}, {'word':req.body.word, 'definition':req.body.definition} )
    .then(() => {
      res.status(200).json({'message':'Successfully Putted'});
    })
    .catch((err) => {
      res.status(500).send(err);
    })
})
app.delete ('/glossary/:id',(req, res) => {
  db.Glossary.deleteOne({'_id':req.params.id})
    .then(() => {
      res.status(410).json({'message' : 'Successfully Deleted!'});
    })
    .catch((err) => {
      res.status(500).send(err);
    })
  })


//listening on PORT
app.listen(process.env.PORT);
console.log(`Listening at http://localhost:${process.env.PORT}`);
