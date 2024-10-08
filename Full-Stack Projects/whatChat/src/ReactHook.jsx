// parent component
class parent extends React.Component{
    render(){
        return(
            <div>
                <h1>You are in parent</h1>
                <child name="suraj" age="23" />
            </div>
        )
    }
}


// child component
class child extends React.Component{
    render(){
        return(
            <div>
                <h1>my name is {this.props.name}</h1>
                <h2>my age is {this.props.age} years.</h2>
            </div>
        )
    }
}





import { useEffect, useState } from "react"
// useState

// example 1.

const counter = ()=>{
    const [count, setCount] = useState(0);

    return(
        <div>
            <h1>count is {count}</h1>
            <button onClick={()=> {setCount(count + 1)}}>click me</button>
        </div>
    )
}

// example 2.
const form =()=>{
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");

    return(
        <div>
            <input type="text" value={name} onChange={(e)=> {setName(e.target.value)}} placeholder="enter name" />
            <input type="email" value={email} onChange={(e)=> {setEmail(e.target.value)}} placeholder="enter email"/>
            <p>your name {name}</p>
            <p>your email {email}</p>
        </div>
    )
}
export default form;




// useEffect
// example 1
// import {useState, useEffect} from React;

const code1 = ()=>{
    const [count, setCount] = useState(0);

    useEffect(()=>{
        document.title = `you clicked ${count} times`;
    },[count]);

    return(
        <div>
            <p>you clicked {count} times</p>
            <button onClick={()=> setCount(count + 1)}>click me</button>
        </div>
    )
}

// example 2.
const dataFetcher = () =>{
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(()=>{
        fetch('https://boomboom.com/posts')
        .then(res => res.json())
        .then(data => {setData(data);
            setLoading(false);
        })
    }, [])

    if(loading){
        return <p>loading...</p>
    }

    return(
        <div>
            <h1>fetched data</h1>
            <ul>
                {data.map((item, i)=>(
                    <li key={item.id}>{item.title}</li>
                ))}
            </ul>
        </div>
    )
}






// useContext

// example 1

// 1.creating a context
import react, { createContext } from "react";

const UserContext = createContext();

export default UserContext;

// 2. provide the context
import react, {useState} from react;
import ChildComponent from '../childComponent'
import UserContext from '../usercontext'

const ParentComponent = ()=>{
    const [user, setUser] = useState({name : "Ramesh", age: "23"})

    return(
        <UserContext.Provider value={user}>
            <ChildComponent/>
        </UserContext.Provider>
    )
}
export default ParentComponent


// 3. consume the context in child component
import react, {useContext} from react
import UserContext from 'userConetxt'

const ChildComponent = () =>{
    const user = useContext(UserContext);

    return(
        <div>
            <h2>my name is {user.name}</h2>
            <h3>my age is {user.age} years</h3>
        </div>
    )
}
export default ChildComponent



// 2. example with state update in context

// creating a context
import react, {createContext} from react

const newContext = createContext();

export default newContext


// providing a value to the context
import react, {useState} from react
import newContext from '../newcontext'
import ChildComponent from '../childcomp'

const ParentComponent () =>{
    const [user, setUser] = useState({name : "ram", age: 32})

    return(
        <newContext.Provider value={{user, setUser}}>
            <ChildComponent/>
        </newContext.Provider>
    )
}
export default ParentComponent

// consuming a context and updating a state
import React, {useContext} from "react";
import newContext from '../'

const ChildComponent = ()=>{
    const {user, setUser} = useContext(newContext)

    const changeName = ()=>{
        setUser((prevUser) => ({...prevUser, name : "sanjay"}))
    }

    return(
        <div>
            <h1> name : {user.name}</h1>
            <h2>age : {user.age}</h2>
            <button onClick={changeName}>click me</button>
        </div>
    )
}









// useMemo
import react, {useState, useMemo} from react

const memoization = () =>{
    const [count, setCount] = useState(0);
    const [input, setInput] = useState('');

    // memoize the expensive calculation
    const expensiveComputation = useMemo(()=>{
        console.log('perform expensive computation');
        return count * 2; // expensive calculation
    }, [count]) // only re-calculates when count changes

    return(
        <div>
            <h1>expensive calculation example</h1>
            <h2>count {count}</h2>
            <p>result of expensiveComputation {expensiveComputation}</p>

            <button onClick={()=>{setCount(count +1)}}>increment</button>

            {/* input not related to expensive calculation */}
            <input type="text" value={input} onChange={(e)=>{setInput(e.target.value)}}/>
        </div>
    )
}
export default memoization





// useCallback
import React, {useState, useCallback} from "react";

const Button = ({handleClick}) =>{
    console.log('Button component re-rendered');
    return <button onClick={handleClick}>increment</button>
}

const useCallbackWithDependency = () =>{
    const [count, setCount] = useState(0);
    const [increment, setIncrement] = useState(1);

    // Memoize the function and only recreate it when 'incrementBy' changes
    const handleClick = useCallback(()=>{
        setCount((prevCount) => prevCount + increment)
    }, [increment]) // Function will be recreated if 'incrementBy' changes

    return(
        <div>
            <h1>useCallback with dependency</h1>
            <p>count {count}</p>
            <Button handleClick={handleClick}/>

            <input type="number" value={increment} onChange={(e) => {setIncrement(Number)(e.target.value)}}/>
        </div>
    )
}
export default useCallbackWithDependency





// useReducer
import { useState, useReducer } from "react";

// define the initial state
const initialState = {count : 0}

// define the reducer function
function reducer(state, action){
    switch(action.type){
        case 'increment' : return {count : state.count + 1};
        case 'decrement' : return {count : state.count - 1};
        case 'reset' : return initialState;
        default : throw new Error(`Unknown action : ${action.type}`)
    }
}

function counter(){
    // use the useReducer hook with reducer and initial state
    const[state, dispatch] = useReducer(reducer, initialState);

    return(
        <div>
            <h1> useReducer example</h1>
            <p>count : {state.count}</p>

            {/* Dispatch actions based on button clicks */}
            <button onClick={()=> dispatch({type: 'increment'})}>increment</button>
            <button onClick={()=> dispatch({type : 'decrement'})}>decrement</button>
            <button onClick={()=> dispatch({type : 'reset'})}>reset</button>
        </div>
    )
}






// usRef
import React, {useRef} from "react";

function inputFocus(){
    // create a ref for the input element
    const inputRef = useRef(null);

    // focus the input element when the button is clicked
    const focusOnElement = () =>{
        inputRef.current.focus();
    }

    return(
        <div>
            <h1>useRef example</h1>
            <input  type="text" ref={inputRef} placeholder="focus me"/>
            <button onClick={focusOnElement}>focus</button>
        </div>
    )
}
export default inputFocus