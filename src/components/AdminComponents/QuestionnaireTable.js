import React, {useEffect, useState} from "react";
import styles from "../../assets/styles/AdminStyles/QuestionTable.module.scss"
import {ReactComponent as FilterIcon} from "../../assets/icons/filterIcon.svg";
import Select from "@material-ui/core/Select/Select";
import MenuItem from "@material-ui/core/MenuItem";
import AdminTableTitle from "./AdminTableTitle";
import {SUCCESS} from "../../types/types";
import AdminTableContent from "./AdminTableContent";
import QuestionnaireTableContent from "./QuestionnaireTableContent";
import {QUESTIONNAIRE_TABLE_SUCCESS} from "../../types/AdminTypes";
import {useDispatch} from "react-redux";

const QuestionnaireTable = ({data}) => {
    const dispatch = useDispatch();
    const [open, setOpen] = React.useState(false);
    const [sort, setSort] = React.useState('Наименованию');
    const [updown,setUpDown] = useState('up');


    const [sortBy] = useState([
        "Наименованию"
    ]);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleChange = (event) => {
        setSort(event.target.value);
        if (event.target.value === "Наименованию"){
            if (updown === 'down'){
                const copy = [...data];
                copy.sort(function(a, b){
                    if(a.user.company.toLowerCase() < b.user.company.toLowerCase()) {
                        return -1; }
                    if(a.user.company.toLowerCase() > b.user.company.toLowerCase()) {
                        return 1; }
                    return 0;
                });
                dispatch({
                    type: QUESTIONNAIRE_TABLE_SUCCESS,
                    payload: copy
                })
            }else{
                const copy = [...data];
                copy.sort(function(a, b){
                    if(a.user.company.toLowerCase() > b.user.company.toLowerCase()) {
                        return -1; }
                    if(a.user.company.toLowerCase() < b.user.company.toLowerCase()) {
                        return 1; }
                    return 0;
                });
                dispatch({
                    type: QUESTIONNAIRE_TABLE_SUCCESS,
                    payload: copy
                })
            }
        }
    };

    const [tableTitle] = useState(['Наименование','Стратегический','Финансовый','юридический','маркетинг','Анкета']);





    return(
        <div className={styles.container}>
            <div className={styles.table}>
                <div className={styles.table_header}>
                    <div className={styles.filter}>
                        <div className={styles.filter_title}>Фильтр</div>
                        <div className={styles.filter_icon}><FilterIcon/></div>
                    </div>
                    <div className={styles.sort}>
                        <div className={styles.sort_title}>
                            Сортировать по
                        </div>
                        <div className={styles.sort_select}>
                            <Select
                                labelId="demo-controlled-open-select-label"
                                id="demo-controlled-open-select"
                                open={open}
                                onClose={handleClose}
                                onOpen={handleOpen}
                                value={sort}
                                onChange={handleChange}
                            >
                                {sortBy.map((el,index)=>(
                                    <MenuItem key={index} value={el}>{el}</MenuItem>
                                ))}
                            </Select>
                            {updown === 'up' ? (
                                <div onClick={()=>{
                                    setUpDown('down')
                                    handleChange({target:{
                                            value:sort
                                        }})
                                }} className={`${styles.arrow} ${styles.up}`}></div>
                            ):(
                                <div onClick={()=>{
                                    setUpDown('up')
                                    handleChange({target:{
                                            value:sort
                                        }})
                                }} className={`${styles.arrow} ${styles.down}`}></div>
                            )}
                        </div>
                    </div>
                </div>
                <div className={styles.admin_table_title}>
                    <table rules="none">
                        <AdminTableTitle data={tableTitle}/>
                        <QuestionnaireTableContent data={data}/>
                    </table>
                </div>
            </div>
        </div>
    )
};
export default QuestionnaireTable;