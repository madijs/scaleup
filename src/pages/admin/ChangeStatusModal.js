import React, {useState} from "react";
import styles from "../../assets/styles/ChangeStatusModal.module.scss"
import Select from '@material-ui/core/Select';
import MenuItem from "@material-ui/core/MenuItem";
import AnketaService from "../../services/AnketaService";


const ChangeStatusModal = ({closeStatusModal,section}) => {
    const [open, setOpen] = React.useState(false);
    const [sort, setSort] = React.useState('К проверке');
    const [sortBy] = useState([
        "К проверке",
        "Проверяю",
        "Готово"
    ]);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleChange = (event) => {
        setSort(event.target.value);
    };

    const changeStatusClicked = () => {
        if (sort === "Готово"){
            const response = new AnketaService().changeStatus(localStorage.getItem('prod_id'),section,3);
            response.then(res=>{
                handleClose();
                closeStatusModal();
            })
        }
        if (sort === "Проверяю"){
            const response = new AnketaService().changeStatus(localStorage.getItem('prod_id'),section,1);
            response.then(res=>{
                handleClose();
                closeStatusModal();
            })
        }
        if (sort === "К проверке"){
            const response = new AnketaService().changeStatus(localStorage.getItem('prod_id'),section,0);
            response.then(res=>{
                handleClose();
                closeStatusModal();
            })
        }
    };


    return(
        <div className={styles.modal}>
            <div className={styles.header}>
                <div className={styles.head}>
                    <div className={styles.title}>
                        Изменение статуса
                    </div>
                    <div onClick={closeStatusModal} className={styles.close}>
                    </div>
                </div>
            </div>
            <div className={styles.content}>
                <Select
                    labelId="demo-controlled-open-select-label"
                    id="demo-controlled-open-select"
                    open={open}
                    variant="outlined"
                    onClose={handleClose}
                    onOpen={handleOpen}
                    value={sort}
                    onChange={handleChange}
                    style={{width:"100%"}}
                >
                    {sortBy.map((el,index)=>(
                        <MenuItem key={index} value={el}>{el}</MenuItem>
                    ))}
                </Select>
                <div className={styles.btns}>
                    <div onClick={changeStatusClicked} className={styles.accessBtn}>Сменить</div>
                    <div style={{flex:'0.2'}}></div>
                    <div onClick={closeStatusModal} className={styles.cancelBtn}>Отмена</div>
                </div>
            </div>
        </div>
    )
};
export default ChangeStatusModal