import './App.css';
import TodoList from './components/TodoList';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { TodosContext } from './contexts/todosContext';
import { v4 as uuidv4 } from 'uuid';
import { useState } from 'react';
import MySnackBar from './components/MySnackBar';
import React from 'react';
import { ToastProvider } from './contexts/ToastContext';

import TodosProvider from './contexts/todosContext';

const theme = createTheme({

  typography: {
    fontFamily: [
      "Alexandria",
    ],
  },

    palette: {
      primary: {
        main: "#004d4d" },
  
}});



const initialTodos = [

    {
        id : uuidv4(),
        title : "المهمة الأولى",
        details : "التفاصيل الخاصة بالمهمة الأولى",
        isDone : false
    },

    
    {
        id : uuidv4(),
        title : "المهمة الثانية",
        details : "التفاصيل الخاصة بالمهمة الثانية",
        isDone : false
    },

        {
        id : uuidv4(),
        title : "المهمة الثالثة",
        details : "التفاصيل الخاصة بالمهمة الثالثة",
        isDone : false
    }


]


function App() {
  const [todos, setTodos] = useState(initialTodos);





  return (
    <ThemeProvider theme={theme}>
      <TodosProvider>
        <ToastProvider>
        <div className="App" style={{display : "flex" , justifyContent : "center" , alignItems : "center" , background: "#191b1f" , height: "100vh" , direction : "rtl"}}>
            <TodoList />
        </div>
      
        </ToastProvider>
      </TodosProvider>
    </ThemeProvider>
  );
}

export default App;
