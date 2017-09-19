const baseUrl='http://localhost:8080/todos'

export const loadTodos=()=>{
  var promiseWithTodos =  fetch(baseUrl)
   .then(res=> res.json());

  return promiseWithTodos;
}

export const createTodo=(todo)=>{
  console.log(todo);
  return fetch(baseUrl,{
    method:'POST',
    headers:{
      'Accept':'application/json',
      'Content-type':'application/json'
    },
    body:JSON.stringify(todo)
  }).then(res=> res.json())
}

export const saveTodo=(todo)=>{
  console.log(todo);
  return fetch(baseUrl,{
    method:'PUT',
    headers:{
      'Accept':'application/json',
      'Content-type':'application/json'
    },
    body:JSON.stringify(todo)
  }).then(res=> res.json())
}
