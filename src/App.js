import React,{useState, useEffect} from 'react';
import './App.css';

// components imports
import Form from "./components/Form"
import TodoList from "./components/TodoList"

function App() {


    const [inputText, setInputText] = useState('')
    const [status, setStatus] = useState('all')
    const [todos, setTodos] = useState([])
    const [filterTodos, setFilterTodos] = useState([])
    const [editing, setEditing] = useState(false)
    const [editTodo, setEditTodo] = useState({})

    //one time effects 
    useEffect(() => {
            // read from local storage when app starts
    const getLocalTodos = () =>{
        // if not present then create empty array else read existing array
        if(localStorage.getItem('todos')===null  ){
            localStorage.setItem('todos', JSON.stringify([])) 
        }else{
            let localTodos = JSON.parse( localStorage.getItem('todos'))
            setTodos(localTodos)
        }
    }
        getLocalTodos() // get local todos when app is launched
    }, [])






    // recursive effects
    useEffect(() => {
        
            // filter by complete or incomplete
            const filterHandler = () =>{
                switch (status) {
                    case 'completed':
                        const remain_true =  todos.filter((todo)=> todo.completed === true)
                        setFilterTodos(remain_true)
                        break;

                    case 'uncompleted':
                        const remain_false =  todos.filter((todo)=> todo.completed === false)
                        setFilterTodos(remain_false)
                        break;

                    default:
                        setFilterTodos(todos)
                        break;
                } 
            }

            // save to local storage
            const saveLocalTodos = () =>{
                localStorage.setItem('todos', JSON.stringify(todos))
            }

        filterHandler() // run everytime the status is changed
        saveLocalTodos()  // run everytime the todos are changed
    }, [todos, status])

    // editing mode effect
    useEffect(() => {
        if(!editing){
            setEditTodo({})
            setInputText('')
        }

    }, [editing])


    // set edting mode
    const editHandler = (todo) =>{
        setEditTodo(todo)
        setInputText(todo.text)
        setEditing(!editing)
    }

    return (
        <div className="App">

            <header>
                <h1>Todo App</h1>
            </header>

            <Form 
                setInputText={setInputText} 
                todos={todos} 
                setTodos={setTodos} 
                inputText={inputText} 
                setStatus={setStatus} 
                editing={editing}
                setEditing={setEditing} 
                editTodo={editTodo}/> 

            <TodoList
                todos={filterTodos}
                setTodos={setTodos}
                editHandler={editHandler}
                editTodo={editTodo}
                editing={editing} />   
        </div>
    );
}

export default App;
