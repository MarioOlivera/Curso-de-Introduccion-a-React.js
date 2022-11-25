import React from 'react'

import {TodoContext} from './../TodoContext'

import {TodoCounter} from '../TodoCounter'
import {TodoSearch} from '../TodoSearch'
import {TodoList} from '../TodoList'
import {TodoItem} from '../TodoItem'
import {TodoForm} from '../TodoForm'
import {CreateTodoButton} from '../CreateTodoButton'

import { Modal } from './../Modal'

import { TodosError } from './../TodosError'
import { TodosLoading } from './../TodosLoading'
import { TodosEmpty } from './../TodosEmpty'

function AppUI()
{
    const {  
        error,
        loading,
        searchedTodos,
        completeTodos,
        deleteTodo,
        openModal,
        setOpenModal
    } = React.useContext(TodoContext)

    return (
    <React.Fragment>
        <TodoCounter/>
        <TodoSearch/>
            <TodoList>
                {error && <TodosError error={error}></TodosError>}
                {loading && <TodosLoading></TodosLoading>}
                { (!loading && !error && !searchedTodos.length ) && <TodosEmpty></TodosEmpty>}
                {
                searchedTodos.map(todo => (
                    <TodoItem 
                    key={todo.text}
                    text={todo.text}
                    completed={todo.completed} 
                    onComplete={() => completeTodos(todo.text)}
                    onDeleteTodo={() => deleteTodo(todo.text)}
                    />
                ))
                }
            </TodoList>

            {openModal == true &&
                <Modal>
                    <TodoForm>
                    </TodoForm>
                </Modal>
            }
        <CreateTodoButton setOpenModal={setOpenModal} openModal={openModal}/>
    </React.Fragment>);
}

export {AppUI}