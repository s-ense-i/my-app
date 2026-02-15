import { createContext, useReducer, useContext } from "react";
import todoReducer from "../reducers/todoReducer";

export const TodosContext = createContext({})

const TodosProvider = ({children}) => {
    const initializer = () => {
        const saved = localStorage.getItem("todos");
        return saved ? JSON.parse(saved) : [];
    };

    const [todos, dispatch] = useReducer(todoReducer, [], initializer);
    return <TodosContext.Provider value={{todos, dispatch}}>
        {children}
    </TodosContext.Provider>
}


export const useTodos = () => useContext(TodosContext);
export default TodosProvider; 