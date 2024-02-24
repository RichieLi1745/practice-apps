const mysql = require("mysql2");
const Promise = require("bluebird");

// Configure process.env variables in ../.env
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});

const db = Promise.promisifyAll(connection, { multiArgs: true });

db.connectAsync()
  .then(() => console.log(`Connected to MySQL as id: ${db.threadId}`))
  .then(() =>
    // Expand this table definition as needed:
    db.queryAsync(
      "CREATE TABLE IF NOT EXISTS userInfo (\
        id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,\
        name varchar(40) ,\
        email varchar(40) , \
        password varchar(40) , \
        line1 varchar(50) , \
        line2 varchar(50) , \
        city varchar (20) ,\
        state varchar(20) , \
        zipCode int ,\
        phone int , \
        creditCardNum INT , \
        expiryDate DATE ,\
        CVV int , \
        billingZip int  \
        )\
    ")
  )
  .catch((err) => console.log("Error during table creation:", err));

const createAccount = (params, callback)=> {
  const queryStr = "INSERT INTO userInfo( name, email, password, line1, line2, city, state, zipCode, phone, creditCardNum, expiryDate, CVV, billingZip) VALUES (?, ?, ?, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL)";
  db.queryAsync(queryStr, params)
    .then((results) => {
      callback(null, results);
    })
    .catch((err) => {
      console.error("Error creating account");
      callback(err)
    })

}
const shipping = (params, callback) => {
  const queryStr = "UPDATE userInfo SET line1 = ?, line2 = ?, city = ?, state = ?, zipCode = ?, phone = ? WHERE id ";
  db.queryAsync(queryStr, params)
    .then((results)=> {
      callback(null, results)
    })
    .catch((err)=> {
      console.error("Error shipping info");
      callback(err)
    })
}
const payment = (params, callback) => {
  const queryStr = "UPDATE userInfo SET creditCardNum = ?, expiryDate = ?, CVV = ?, billingZip = ? WHERE id";
  db.queryAsync(queryStr, params)
    .then((results) => {
      callback(null, results)
    })
    .catch((err) => {
      console.error("Error payment info")
      callback(err)
    })
}
const purchase = (callback) => {
  const queryStr = "SELECT * FROM userInfo";
  db.queryAsync(queryStr)
    .then((results) => {
      callback(null, results);
    })
    .catch((err)=> {
      console.error("Error purchasing")
      callback(err);
    })
}
module.exports.db = db;
module.exports.createAccount = createAccount;
module.exports.shipping = shipping;
module.exports.payment = payment;
module.exports.purchase = purchase;

