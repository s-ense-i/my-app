import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import CheckIcon from '@mui/icons-material/Check';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';

import { useTodos } from '../contexts/todosContext';
import { ToastContext, useToast } from '../contexts/ToastContext';

export default function Todo({ todo , showDelete, showUpdate }) {
    const {todos, dispatch} = useTodos();
    const {showHideSnackBar} = useToast();

    function handleCheckClick() {
    const newIsDone = !todo.isDone;
    dispatch({ type: "Toggle_TODO", payload: { todo } });
    if (newIsDone) {
        showHideSnackBar("تم إكمال المهمة بنجاح!");
    } else {
        showHideSnackBar("تم إعادة المهمة إلى قائمة المهام غير المكتملة!");
    }
    }



    
    return(
        <>
        <Card className='todoCard' sx={{ minWidth: 275 , backgroundColor : "#283593" , marginTop : "5px" }}>
        <CardContent style={{color :"white"}}>
            <Grid container spacing={2}>
            <Grid size={8} style={{ marginTop : 5 }}>
                <Typography variant="h4" sx={{color : "white" , textAlign : "right" , textDecoration : todo.isDone ? "line-through" : "none"}}>
                    {todo.title}
                </Typography>
                <Typography variant="h6" sx={{color : "white" , textAlign : "right"}}>
                    {todo.details}
                </Typography>
            </Grid>
            <Grid size={4} display={'flex'} justifyContent={'space-around'} alignItems={'center'} >
            <IconButton className='iconButton' aria-label="delete" style={{color : todo.isDone ? "white" : "#8bc34a" , backgroundColor : todo.isDone ? "#8bc34a" : "white" , border :"solid #8bc34a 3px" }} onClick={()=> handleCheckClick()}>
                <CheckIcon />
            </IconButton>
            <IconButton className='iconButton' aria-label="delete" style={{color : "#1769aa" , backgroundColor : "white" , border :"solid #1769aa 3px" }} onClick={() => showUpdate(todo)}>
                <ModeEditOutlineOutlinedIcon />
            </IconButton>
            <IconButton className='iconButton' aria-label="delete" style={{color : "#b23c17" , backgroundColor : "white" , border :"solid #b23c17 3px" }} onClick={() => showDelete(todo)}>
                <DeleteIcon />
            </IconButton>
            </Grid>
            </Grid>


      </CardContent>
    </Card>
        </>
    )
}
