import React from "react";

import {TodoProvider} from './../TodoContext'
import { AppUI } from "./AppUI";


function App(props) {


  return (
    <TodoProvider>
      <AppUI></AppUI>
    </TodoProvider>
  );
}

export default App;
