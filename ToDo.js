//find the elements
const todoform = document.querySelector(".todo-form");
const todoinput = document.querySelector(".todo-input");
const todolists = document.querySelector("#lists");
const messageElement = document.querySelector("#message");

//createTodo
const createTodo = (todoid,todoValue) => {
 const todoElement = document.createElement("li");
todoElement.id = todoid;
todoElement.classList.add("li-style");
todoElement.innerHTML = `<span>
${todoValue}</span><span>
<button class="btn" id="deleteButton">
<i class="fa-solid fa-trash"></i></button>
</span>`;
todolists.appendChild(todoElement);
//delete button
const deleteButton = todoElement.querySelector("#deleteButton");
deleteButton.addEventListener("click",deleteTodo);
}
//deleteTodo
const  deleteTodo = (event)=>{
const selectTodo = event.target.closest("li");
todolists.removeChild(selectTodo);
showMessage("todo is removed successfully","danger");
//delete todo from localstorage
let todos = getTodosFromLocalStorage();
todos = todos.filter((todo)=>todo.todoid !== selectTodo.id);
localStorage.setItem("todos",JSON.stringify(todos));
}


//showMessage
const showMessage = (text,status)=>{
messageElement.textContent = text;
messageElement.classList.add(`bg-${status}`);
setTimeout(()=>{
    messageElement.textContent = "";
    messageElement.classList.remove(`bg-${status}`);
},1000);
}
//getTodosFromLocalStorage
const getTodosFromLocalStorage = () => {
    return localStorage.getItem("todos") ? JSON.parse(localStorage.getItem("todos")) : [];
}
//addTodo
const addTodo = (event) =>{
    event.preventDefault();
    const todoValue = todoinput.value;
    const todoid = Date.now().toString();
    createTodo(todoid,todoValue);
    // console.log(todoValue);
    showMessage("Todo added successfully","success");
    //add todo to local storage
    const todos = getTodosFromLocalStorage();
    todos.push({todoid,todoValue});
    localStorage.setItem("todos",JSON.stringify(todos));
    todoinput.value = "";
}
const loadTodos = () => {
    const todos = getTodosFromLocalStorage();
    todos.map((todo)=>
        createTodo(todo.todoid,todo.todoValue)
    );
}

todoform.addEventListener("submit",addTodo);
window.addEventListener("DOMContentLoaded",loadTodos);