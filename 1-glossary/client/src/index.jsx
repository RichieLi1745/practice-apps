import React from "react";
import { render } from "react-dom";


const App = () => {

  return (
    <div>

      <List/>
      <AddWords/>
    </div>

  )
}

ReactDOM.render(<App />, document.getElementById('root'));

