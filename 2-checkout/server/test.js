const express = require('express');
const path = require('path');
const db = require('/db.js');
const app = express();

app.get('/test', (req, res)=> {
  db.query()
    .then((result) => {
      res.status(200).json(results);
    })
    .catch((err) => {
      res.status(500).json(err)
    })
  db.query(queryStr, (err, results)=> {
    if(err) {
      res.status(500).json(err);
    }
    res.status(200).json(results);

  })
})
