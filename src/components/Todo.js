import React from 'react'
import {FaCheck, FaTrash} from 'react-icons/fa'


function Todo({todo, todos, setTodos, editHandler, editing, editTodo}) { 

    const deleteHandler = () =>{
        
        const remains = todos.filter((el)=>el.id!==todo.id ) // get all that Don't equal to this id 
        setTodos(remains) // set the remains as the new state
    }

    const completeHandler = () =>{
        todo.completed = ! todo.completed
        const remains = todos.filter((el)=>el.id!==todo.id )
        remains.push(todo)
        setTodos(remains)
    }
    return (
        
        <div className={editing && editTodo.id === todo.id ? "todo-edit": "todo"} onDoubleClick={()=>editHandler(todo)}>

            <li className={`todo-item ${todo.completed? 'completed': ''}`} > {todo.text} </li>
            {
                editTodo.id === todo.id ?(
                    null
                ):(
                    
                        <button className='complete-btn' onClick={completeHandler} >
                            <FaCheck/> 
                        </button>
                )
            
            }
            <button className='trash-btn'  onClick={deleteHandler} > 
                <FaTrash/>
            </button>

        </div>
    )
}

export default Todo
