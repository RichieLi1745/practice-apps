import React, { useState } from 'react';

const AddToList = ({ handleAdd }) => {
  const [addWord, setAddWord] = useState('');
  const [addDefinition, setAddDefinition] = useState('');
  //const [combine, setCombine] = useState({});
  const onAddWord = (e) => {
    setAddWord(e.target.value);
  }
  const onAddDefinition = (e) => {
    setAddDefinition(e.target.value);
  }
  const buttonAddWord = () => {
    console.log()
    const toBeAdded = {
      'word': addWord,
      'definition': addDefinition
    }
    handleAdd(toBeAdded);
  }

  return (
  <div>
    Word: <input placeholder="Add Word"value={addWord} onChange={onAddWord}/>
    Definition: <input placeholder="Add Definition" value={addDefinition} onChange={onAddDefinition}/>
    <button onClick={buttonAddWord}>Add Word</button>
  </div>
  )
}
export default AddToList;