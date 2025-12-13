import { FaCheckCircle  } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { AiFillDelete } from "react-icons/ai";



import { useEffect, useState } from "react"
import "./Todo.css"
export const Todo = () => {
    const [input,setInput]=useState("");
    const [todos,setTodos]=useState([]);
    const [dones,setDones]=useState([])
    const [dateTime,setDateTime]=useState("");
 
  
    
    const handleOnchange=(input)=>{
        setInput(input);
    }
    const handleSubmit=(e)=>{
        e.preventDefault();
        if(!input)return;
        if(todos.includes(input)){
            setInput("");
            return
        };
        if(input.length>7)return;

        setTodos((prevTodo)=>[...prevTodo,input]);
        setInput("")
    }
  
    useEffect(()=>{const interval=setInterval(()=>{
        const now= new Date();
        const formatedDate=now.toLocaleDateString();
        const formatedTime=now.toLocaleTimeString();
        setDateTime(`${formatedDate} - ${formatedTime}`);   
    },1000)},[])
    const handleDelete=(value)=>{
        const updatedTodos=todos.filter((curTodo)=>curTodo!==value)
        setTodos(updatedTodos)
    }
    const handleClear=()=>{
        setTodos([])
    }
    const handleDone=(value)=>{
        setDones((prevDones)=>[...prevDones,value]);
        const updatedTodos=todos.filter((curTodo)=>curTodo!==value)
        setTodos(updatedTodos)
    }
    
    
    const handleReset=()=>{
       
        setDones([])
    }
   
    return(
       
        <div>
            <header className="header">
                <h1>Todo List</h1>
            </header>
            <h2 className="date">{dateTime}</h2>
            <div className="maindiv">
                <form onSubmit={handleSubmit}>
                    <div>
                        <input value={input} onChange={(Event)=>handleOnchange(Event.target.value)} type="text" className="taskname" placeholder="Enter a task"/>
                        <button type="submit" className="submit">Add Task</button>
                    </div>
                    
                </form>
            </div>
            <section>
                <div className="ulist">
                    {
                       todos.map((curTask, index)=>{
                        return (<div className="list" key={index}>
                            {curTask} 
                           <button className="tick-btn" onClick={()=>handleDone(curTask)}><FaCheckCircle className="tick" /></button> 
                            <button className="delete-btn" onClick={()=>handleDelete(curTask)}><MdDeleteForever className="delete"/></button>

                            </div>)

                       })
                    }
                </div>
            </section>
            <section className="clear-btn">
                <button className="clr-btn" onClick={handleClear}>clear all</button>
            </section>
            <section className="completed">
                <h1>Completed</h1>
            </section>
            <section>
                <div className="comp-ulist">
                    {
                       dones.map((curTask, index)=>{
                        return (<div className="comp-list" key={index}>
                            {curTask} 
                           
                            </div>)

                       })
                    }
                </div>
            </section>
            <section className="clear-btn">
                <button className="clr-btn" onClick={handleReset}>reset</button>
            </section>
        </div>
    )
}
