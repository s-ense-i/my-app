import { v4 as uuidv4 } from 'uuid';


export default function todoReducer(currentTodos, action){
    switch(action.type){
        case "ADD_TODO":{
            const newTodo = {
            id: uuidv4(),
            title: action.payload.title,
            details: "",
            isDone: false
            };


            const updatedTodos = [...currentTodos, newTodo];
            localStorage.setItem("todos", JSON.stringify(updatedTodos))
            return updatedTodos;


        }
        case "DELETE_TODO":{
            if (action.payload.selectedTodo) {
                const updatedTodos = currentTodos.filter((t) => t.id !== action.payload.selectedTodo.id);
                localStorage.setItem("todos", JSON.stringify(updatedTodos));
                return updatedTodos;
            }
            return currentTodos;
        }
        case "UPDATE_TODO":{
        if (action.payload.selectedTodoForUpdate) {
            const mappedTodos = currentTodos.map((t) => {
            if (t.id === action.payload.selectedTodoForUpdate.id) {
                return { ...t, title: action.payload.updateTitle, details: action.payload.updateDetails };
            }
            return t;
            });
            localStorage.setItem("todos", JSON.stringify(mappedTodos));
            return mappedTodos;
      }
            return currentTodos;
        }
        case "Get_TODOS":{
            const savedTodos = localStorage.getItem("todos");
            if (savedTodos) {
                return JSON.parse(savedTodos);
    }
            return currentTodos;
        }

        case "Toggle_TODO":{
            const updatedTodos = currentTodos.map((t) => {
                if (t.id === action.payload.todo.id) {
                    const updatedTodo = { ...t, isDone: !t.isDone };
                    return updatedTodo;
                }
                return t;
            });
            localStorage.setItem("todos", JSON.stringify(updatedTodos))
            return updatedTodos;
        }
        default:
            throw new Error("Invalid action type");
    }
}