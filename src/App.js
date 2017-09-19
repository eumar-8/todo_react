import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {TodoForm,TodoList,Footer} from './components/todo/'
import {addTodo,generateId, findById,toggleTodo,updateTodo} from './lib/todoHelpers'
import { loadTodos,createTodo} from './lib/todoService';

class App extends Component {
  state={
    todos:[],
  currentTodo:""
}

componentWillMount() {
  loadTodos()
  .then(todosFromAPI => {
    this.setState({todos: todosFromAPI});
  })
}


handleInputChange = (evt)=> {
  this.setState({
    currentTodo: evt.target.value
  })
}
handleToggle=(id)=>{
  const todo= findById(id,this.state.todos)
  const toggled=toggleTodo(todo)
  const updatedTodos=updateTodo(this.state.todos,toggled)
  this.setState({todos: updatedTodos})

}


handleSubmit = (evt) => {
  evt.preventDefault()
  const newId=generateId()
  const newTodo={id:newId,name:this.state.currentTodo,isComplete:false}
  const updatedTodos=addTodo(this.state.todos,newTodo)
  this.setState({
    todos: updatedTodos,
    currentTodo:'',
    errorMessage:''
  })
  createTodo(newTodo)
  .then(()=>this.showTempMessage('todo added'))
}

showTempMessage = (msg)=>{
  this.setState({message:msg})
  setTimeout(()=>this.setState({message:""}),2500)

}

handleEmptySubmit=(evt)=>{
  evt.preventDefault()
  this.setState({
    errorMessage:"please supply a todo name"
  })

}

render() {
  const submitHandler= this.state.currentTodo ?  this.handleSubmit : this.handleEmptySubmit

  return (
    <div className="App">
      <div className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h2>React todos</h2>
      </div>
      <div className="Todo-App">
        {this.state.errorMessage && <span className="error">{this.state.errorMessage}</span>}
        {this.state.message && <span className="succes">{this.state.message}</span>}
        <TodoForm
          handleInputChange={this.handleInputChange}
          currentTodo={this.state.currentTodo}
          handleSubmit={submitHandler}/>
        <TodoList  handleToggle={this.handleToggle}todos={this.state.todos}/>
        <Footer/>
      </div>
    </div>

  );
}
}

export default App;
