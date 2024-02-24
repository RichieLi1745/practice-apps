import React from 'react';

const CreateAccount = ({ handleCreate }) => {
  const onCreate = () => {
    handleCreate();
  }
  return (
    <div>
      <button onClick={onCreate}>Checkout</button>
    </div>
  )

}
export default CreateAccount;