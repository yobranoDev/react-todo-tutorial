import React from 'react'
// import componets
import Todo from './Todo'

function todoList({todos, setTodos, editHandler, editing, editTodo}) {
    return (
        <div className="todo-container">

            <ul className="todo-list">
                {/* todo list item display */}
                {
                    todos.map(
                        todo => <Todo key = {todo.id} todo={todo} todos={todos} setTodos={setTodos} editHandler={editHandler}  editing={editing} editTodo={editTodo} />
                    )
                }

            <i>(double click item to edit)</i>                
            </ul>

        </div>
    )
}

export default todoList
