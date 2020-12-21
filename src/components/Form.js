import React,{useEffect, useRef} from 'react'
import { FaPlusSquare} from 'react-icons/fa'

function Form({setInputText, inputText, todos, setTodos, setStatus, editing, setEditing,editTodo}) {
    const inputTextRef =  useRef(null)
    // auto focus on input on load effect
    useEffect(() => {
        
        inputTextRef.current.focus()
    }, [])

    const todo = {
        text: inputText,
        completed:false,
        id: (todos.length+1)*Math.random()*100
    } 
    const inputTextHandler = (e) =>{
        setInputText(e.target.value)
        return e.target.value
    }

    const submitHandler = (e) =>{
        e.preventDefault()
        if (editing){
            const pos = todos.indexOf(editTodo)
            
            
            todos[pos] = todo
            setTodos(todos)
            setEditing(false)
        }else{
            setTodos([
                ...todos,
                todo
            ])
        }
            setInputText("")
        }

    const statusHandler = (e) =>{
        setStatus(e.target.value)
        
    }
    return (
        <form>
            <input type="text" className="todo-input" onChange={inputTextHandler} value={inputText} ref = {inputTextRef}/>

            <button className="todo-button" type="submit" onClick={submitHandler} >
                <FaPlusSquare/>
            </button>
            
            <div className="select">
                <select onChange={statusHandler} name="todos" className="filter-todo">
                    <option value="all">All</option>
                    <option value="completed">Completed</option>
                    <option value="uncompleted">Uncompleted</option>
                </select>
            </div>
        </form>
    )
}

export default Form