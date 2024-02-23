import React, { useState, useEffect } from "react";
import ReactDOM, { render } from "react-dom";
const axios = require('axios');
import Search from './components/Search.jsx';
import List from './components/List.jsx';
import AddToList from './components/AddToList.jsx';

//this component handles logic for our glossary list
const App = () => {
  const [list, setList] = useState([]);
  //axios get request to populate list
  const handleList = () => {
    axios.get('/glossary')
      .then((result) => {
        setList(result.data);
    })
  }
  //on load -> render List
  handleList();
  //axios get request to search the list and filter
  const handleSearch = (query) => {
    axios.get('/glossary')
      .then((result) => {
        const queryResult = result.data.filter(key => {
          return key.word.toLowerCase().includes(query.toLowerCase())
        });
        setList(queryResult);
      })
  }
  //axios post request to add to list
  const handleAdd = (data) => {
    console.log(data);
    const dataToAdd = {
      'word': data.word,
      'definition': data.definition
    }
    axios.post('/glossary', dataToAdd)
      .then(() => {
        handleList();
      })
  }
  const handleEdit = (edit, previousWord) => {
    const data = {
      '_id': previousWord._id,
      'word': edit.word,
      'definition': edit.definition
    }
    axios.put('/glossary', data)
      .then(() => {
        //axios get request to repopulate list
        handleList();
      })
  }
  //axios delete request
  const handleDelete = ({word}) => {
    axios.delete(`/glossary/${word._id}`)
      .then(() => {
        handleList();
      })
  }
  return (
    <div>
      <h2><i>Glossary</i></h2>
      <Search handleSearch={handleSearch}/>
      <AddToList handleAdd={handleAdd} />
      <h2><u>List</u></h2>
      <List list={list} handleEdit={handleEdit} handleDelete={handleDelete}/>

    </div>

  )
}

ReactDOM.render(<App />, document.getElementById('root'));

