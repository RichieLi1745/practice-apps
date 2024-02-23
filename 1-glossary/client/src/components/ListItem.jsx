import React, { useState } from 'react';

const ListItem = ({ word, handleEdit, handleDelete }) => {
  const [edit, setEdit] = useState('');
  const [editDef, setEditDef] = useState('');
  const editWord = () => {
    const data = {
      'word': edit,
      'definition': editDef
    }
    handleEdit(data, word);
    setEdit('');
    setEditDef('');
  }
  const onEdit = (e) => {
    setEdit(e.target.value);
  }
  const onEditDefinition = (e) => {
    setEditDef(e.target.value);
  }
  const deleteWord = () => {

    handleDelete({word});
  }

  return (
    <div>
      <div>
        Word: {word.word}
        <div> Definition: {word.definition}</div>
      </div>
      <input placeholder="Edit Word" value={edit} onChange={onEdit}/>
      <input placeholder="Edit Definition" value={editDef} onChange={onEditDefinition}/>
      <button onClick={editWord}>Edit</button>
      <button onClick={deleteWord}>Delete</button>
    </div>
  )

}

export default ListItem;