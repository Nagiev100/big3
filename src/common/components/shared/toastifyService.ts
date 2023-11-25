import {toast} from "react-toastify";


export const handleNotifyError = (text: string) => {
    return () => toast("Ошибка! Нельзя удалить команду у которой есть игроки", {type: "error",
        bodyStyle: {
            background: "#FF5761",
            color: "white",
            padding: "4px 16px",
            margin: 0,
        },

        draggable: true,
        icon: ()=> null,
        closeButton: ()=> null,
        closeOnClick: true,
        hideProgressBar: true,
        style: {padding: 0,  right: 0}
    });
}