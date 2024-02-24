import React, { useState, useEffect} from "react";
import ReactDOM, { render } from "react-dom";
import CreateAccount from './components/createAccount.jsx';
const App = () => {

  const [forms, setForms] = useState(0);
  const goToNext = () => {
    setForms(forms++);
  }
  const switchForms = () => {
    switch (forms) {
      case 0 : {
        return (
          <div>
            <h2>Create Account</h2>
            <p>
              <code>Page Cookie: {JSON.stringify(document.cookie, undefined, "\t")}</code>
            </p>
            <button onClick={goToNext}>Checkout</button>
          </div>
        )
      }
      case 1 : {
        return (
          <Form1 goToNext={goToNext}/>
        )
      }
      case 2: {
        return (
          <Form2 goToNext={goToNext}/>
        )
      }
      case 3: {
        return (
          <Form3 goToNext={goToNext}/>
        )
      }
      case 4: {
        return (
          <Purchased goToNext={goToNext}/>
        )
      }
      throw Error("Done");
    }
  }


switchForms();
}

ReactDOM.render(<App />, document.getElementById("root"));