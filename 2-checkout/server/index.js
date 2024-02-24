require("dotenv").config();
const express = require("express");
const path = require("path");
const sessionHandler = require("./middleware/session-handler");
const logger = require("./middleware/logger");

// Establishes connection to the database on server start
const db = require("./db");

const app = express();

app.use(express.json());
// Adds `req.session_id` based on the incoming cookie value.
// Generates a new session if one does not exist.
app.use(sessionHandler);

// Logs the time, session_id, method, and url of incoming requests.
app.use(logger);

// Serves up all static and generated assets in a specified folder.
app.use(express.static(path.join(__dirname, '/../client/dist')));

/****
 *
 *
 * Other routes here....
 *
 *
 */
const {createAccount} = require('./db');
const {shipping} =require('./db');
const {payment} = require('./db');
const {purchase} = require('./db');

app.post('/checkout/createAccount', (req, res) => {
  const {name, email, password, line1, line2, city, state, zipCode, phone, creditCardNum, expiryDate, CVV, billingZip} = req.body;
  createAccount([name, email, password, line1, line2, city, state, zipCode, phone, creditCardNum, expiryDate, CVV, billingZip], (err, results) => {
    if(err) {
      res.status(500).json({error: err.message});
    }
    res.status(201).json({'message': 'Successfully added account!'});
  })
})

app.put('/checkout/shipping', (req, res) => {
  const {line1, line2,city, state, zipCode, phone} = req.body;
  shipping([line1, line2,city, state, zipCode, phone],(err, results) => {
    if(err) {
      res.status(500).json({error: err.message});
    }
    res.status(200).json({'message': 'Successfully updated shipping info!'});
  })
})
app.put('/checkout/payment', (req, res) => {
  const {creditCardNum, expiryDate, CVV, billingZip} = req.body;
  payment([creditCardNum, expiryDate, CVV, billingZip], (err,results) => {
    if(err) {
      res.status(500).json({error: err.message});
    }
    res.status(200).json({'message': 'Successfully updated payment info!'});
  })
})
app.get('/checkout/purchased', (req, res) => {
  purchase((err, results) => {
    if(err) {
      res.status(500).json({"error": err.message});
    }
    res.status(200).send(results);
  })
})

app.listen(process.env.PORT);
console.log(`Listening at http://localhost:${process.env.PORT}`);
