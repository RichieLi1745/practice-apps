import React from 'react';
import ListItem from './ListItem.jsx'
const List = ({ list, handleEdit ,handleDelete }) => {
  return (
    <div>

      {list.map(word => {
        return <ListItem key={word._id} word={word} handleEdit={handleEdit} handleDelete={handleDelete}/>
      })}
    </div>
  )
}

export default List;