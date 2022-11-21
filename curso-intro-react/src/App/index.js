import React from "react";

import { AppUI } from "./AppUI";

const defaultTodos = [
  { text: 'Cortar cebolla', completed: true },
  { text: 'Tomar el curso de intro a React', completed: false },
  { text: 'Llorar con la llorona', completed: false }
]

function App(props) {

  const [todos, setTodos] = React.useState(defaultTodos);
  const [searchValue, setSearchValue] = React.useState('');

  const completedTodos = todos.filter(todo => todo.completed == true).length
  const totalTodos = todos.length

  let  searchedTodos = [];

  if(searchValue.length == 0)
  {
    searchedTodos = todos;
  }
  else
  {
    searchedTodos = todos.filter(todo => {
      const todoText = todo.text.toLowerCase();
      const searchText = searchValue.toLowerCase();

      return todoText.includes(searchText);
    })
  }

  const completeTodos = (text) => {

    const todoIndex = todos.findIndex( todo => todo.text == text);

    const newTodos = [...  todos]
    newTodos[todoIndex].completed = true;

    setTodos(newTodos)
  }

  const deleteTodo = (text) => {

    const newTodos = todos.filter( todo => todo.text != text);

    setTodos(newTodos)
  }

  return (
    <AppUI 
      totalTodos={totalTodos} 
      completedTodos={completedTodos}
      searchValue={searchValue} 
      setSearchValue={setSearchValue} 
      searchedTodos={searchedTodos}
      completeTodos={completeTodos}
      deleteTodo={deleteTodo}
    ></AppUI>
  );
}

export default App;
