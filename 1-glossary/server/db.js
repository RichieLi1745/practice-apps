//
const mongoose = require("mongoose");

// 1. Use mongoose to establish a connection to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/glossary', {useNewUrlParser: true,
useUnifiedTopology: true});
// 2. Set up any schema and models needed by the app
let glossarySchema = new mongoose.Schema({
  word: String,
  definition: String
})
//model reference
let Glossary = mongoose.model('Glossary', glossarySchema);
// 3. Export the models
// 4. Import the models into any modules that need them
module.exports = {'Glossary':Glossary};
