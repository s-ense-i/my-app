import * as React from 'react';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Todo from './Todo';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import { useToast } from '../contexts/ToastContext';
import { useState, useMemo } from 'react';
import { useTodos } from '../contexts/todosContext';


import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function TodoList() {
  const { todos, dispatch } = useTodos();
  const [open, setOpen] = useState(false);
  const {showHideSnackBar} = useToast();
  const [selectedTodo, setSelectedTodo] = useState(null);
  const [selectedTodoForUpdate, setSelectedTodoForUpdate] = useState(null);
  const [updateOpen, setUpdateOpen] = useState(false);
  const [updateTitle, setUpdateTitle] = useState("");
  const [updateDetails, setUpdateDetails] = useState("");
  const [titleInput , setTitleInput] = useState("");
  const [displayedTodosType, setDisplayedTodosType] = useState("all");

  function handleAddTodo() {

    dispatch({ type: "ADD_TODO", payload: { title: titleInput } });
    setTitleInput("");
    showHideSnackBar("تمت إضافة المهمة بنجاح!");

  }

    const completedTodos = useMemo(() => todos.filter((t) => t.isDone), [todos]);
    const pendingTodos = useMemo(() => todos.filter((t) => !t.isDone), [todos]);
    let displayedTodos = todos;
    if (displayedTodosType === "completed") {
      displayedTodos = completedTodos;
    } else if (displayedTodosType === "pending") {
      displayedTodos = pendingTodos;
    }

  const todosjsx = displayedTodos.map((t) => (
    <Todo key={t.id} todo={t} showDelete={showDeleteDialog} showUpdate={showUpdateDialog} />
  ));
  
  function changeDisplayedTodosType(e, newType) {
    if (newType !== null) {
      setDisplayedTodosType(newType);
    }
  }
  


  // Todos are initialized by the TodosProvider from localStorage.


    function handleDeleteClick() {
        if (selectedTodo) {
            dispatch({ type: "DELETE_TODO", payload: { selectedTodo } });
            setOpen(false);
            showHideSnackBar("تم حذف المهمة بنجاح!");
        }
    }
    
    function showDeleteDialog(todo){
        setSelectedTodo(todo);
        setOpen(true);
    }

    function showUpdateDialog(todo){
      setSelectedTodoForUpdate(todo);
      setUpdateTitle(todo.title || "");
      setUpdateDetails(todo.details || "");
      setUpdateOpen(true);
      showHideSnackBar("يمكنك الآن تعديل المهمة!");
    }

    function handleUpdateConfirm(){
      if (selectedTodoForUpdate) {
        dispatch({ type: "UPDATE_TODO", payload: { selectedTodoForUpdate, updateTitle, updateDetails } });
        setUpdateOpen(false);
        setSelectedTodoForUpdate(null);
        showHideSnackBar("تم تحديث المهمة بنجاح!");
      }
    }

  return (
    <>
            <Dialog
        style={{direction : 'rtl'}}
        onClose={() => setOpen(false)}
        open={open}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"هل أنت متأكد من حذف هذه المهمة؟"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            عند حذف المهمة، سيتم فقدان جميع التفاصيل المتعلقة بها ولن تتمكن من استعادتها مرة أخرى.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => { setOpen(false); setSelectedTodo(null); }}>اغلاق</Button>
          <Button onClick={handleDeleteClick} style={{color : "red"}}  autoFocus>
            حذف
          </Button>
        </DialogActions>
      </Dialog>
      
      <Dialog
        style={{direction : 'rtl'}}
        onClose={() => setUpdateOpen(false)}
        open={updateOpen}
        aria-labelledby="update-dialog-title"
        aria-describedby="update-dialog-description"
      >
        <DialogTitle id="update-dialog-title">{"تحديث المهمة"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="update-dialog-description">
            عدل عنوان المهمة أو تفاصيلها ثم اضغط تأكيد لحفظ التغييرات.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            label="عنوان المهمة"
            fullWidth
            variant="standard"
            value={updateTitle}
            onChange={(e) => setUpdateTitle(e.target.value)}
          />
          <TextField
            margin="dense"
            label="تفاصيل المهمة"
            fullWidth
            variant="standard"
            value={updateDetails}
            onChange={(e) => setUpdateDetails(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => { setUpdateOpen(false); setSelectedTodoForUpdate(null); }}>اغلاق</Button>
          <Button onClick={handleUpdateConfirm} autoFocus>
            تأكيد
          </Button>
        </DialogActions>
      </Dialog>
    <Container maxWidth="sm">
      <Card sx={{ minWidth: 275, maxHeight: "80vh", overflow: "scroll" }}>
        <CardContent>
          <Typography variant="h2" sx={{ justifyContent: "center", display: "flex", fontWeight: "bold" }}>
            مهامي
          </Typography>
          <Divider sx={{ marginTop: "10px" }} />
          <ToggleButtonGroup
            exclusive
            value={displayedTodosType}
            onChange={changeDisplayedTodosType}
            aria-label="text alignment"
            color='primary'
            style={{ marginTop: "20px", direction: "ltr", justifyContent: "center", display: "flex", marginBottom: "20px" }}
          >
            <ToggleButton value="all">الكل</ToggleButton>
            <ToggleButton value="completed">منجز</ToggleButton>
            <ToggleButton value="pending">غير منجز</ToggleButton>
          </ToggleButtonGroup>

          {todosjsx}

          <Grid container style={{ marginTop: "20px" }} spacing={2}>
            <Grid size={8} sx={{ display: "flex", justifyContent: "space-around", alignItems: "center" }}>
              <TextField id="outlined-basic" label="عنوان المهام" variant="outlined" fullWidth value={titleInput} onChange={(e) => setTitleInput(e.target.value)}/>
            </Grid>
            <Grid size={4} sx={{ display: "flex", justifyContent: "space-around", alignItems: "center" }}>
              <Button sx={{ width: "100%", height: "100%" }} variant="contained" color="primary" onClick={handleAddTodo} disabled={titleInput.length === 0}>
                اضافة
              </Button>
            </Grid>
          </Grid>

        </CardContent>
      </Card>
    </Container>
    </>
  );
}