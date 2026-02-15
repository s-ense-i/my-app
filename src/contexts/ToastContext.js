import { createContext , useContext} from "react";
import React from "react";
import MySnackBar from "../components/MySnackBar";

const ToastContext = createContext({})

export const ToastProvider = ({children}) => {
      const [open, setOpen] = React.useState(false);
      const [message, setMessage] = React.useState('');
    function showHideSnackBar(message) {
        setOpen(true);
        setMessage(message);
        setTimeout(() => {
        setOpen(false);
        }, 3000);
    }

    return (
        <ToastContext.Provider value={{showHideSnackBar}}>
             <MySnackBar open={open} message={message} />
            {children}
        </ToastContext.Provider>
)}

const useToast = () => useContext(ToastContext);
export { useToast };