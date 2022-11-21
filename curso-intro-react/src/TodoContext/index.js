import React from 'react'
import {useLocalStorage} from './useLocalStorage'

const TodoContext = React.createContext();

function TodoProvider(props)
{
    const {
        item: todos, 
        saveItem: saveTodos, 
        loading: loading,
        error: error
    } = useLocalStorage('TODOS_V1',[]);

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

        saveTodos(newTodos)
    }

    const deleteTodo = (text) => {

        const newTodos = todos.filter( todo => todo.text != text);

        saveTodos(newTodos)
    }

    return (<TodoContext.Provider value={{
        loading: loading,
        error: error,
        totalTodos: totalTodos, 
        completedTodos: completedTodos,
        searchValue: searchValue, 
        setSearchValue: setSearchValue, 
        searchedTodos: searchedTodos,
        completeTodos: completeTodos,
        deleteTodo: deleteTodo
    }}>
        {props.children}
    </TodoContext.Provider>)
}

function TodoConsumer()
{
    return (<TodoContext.Consumer></TodoContext.Consumer>)
}

export {TodoContext, TodoProvider}