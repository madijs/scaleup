import React, {useEffect, useState} from "react";
import styles from "../../assets/styles/AdminStyles/QuestionTable.module.scss"
import {ReactComponent as FilterIcon} from "../../assets/icons/filterIcon.svg";
import Select from "@material-ui/core/Select/Select";
import MenuItem from "@material-ui/core/MenuItem";
import AdminTableTitle from "./AdminTableTitle";
import {SUCCESS} from "../../types/types";
import AdminTableContent from "./AdminTableContent";
import QuestionnaireTableContent from "./QuestionnaireTableContent";

const QuestionnaireTable = ({data}) => {
    const [open, setOpen] = React.useState(false);
    const [sort, setSort] = React.useState('Наименованию');

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
                    {/*<div className={styles.sort}>*/}
                    {/*    <div className={styles.sort_title}>*/}
                    {/*        Сортировать по*/}
                    {/*    </div>*/}
                    {/*    <div className={styles.sort_select}>*/}
                    {/*        <Select*/}
                    {/*            labelId="demo-controlled-open-select-label"*/}
                    {/*            id="demo-controlled-open-select"*/}
                    {/*            open={open}*/}
                    {/*            onClose={handleClose}*/}
                    {/*            onOpen={handleOpen}*/}
                    {/*            value={sort}*/}
                    {/*            onChange={handleChange}*/}
                    {/*        >*/}
                    {/*            {sortBy.map((el,index)=>(*/}
                    {/*                <MenuItem key={index} value={el}>{el}</MenuItem>*/}
                    {/*            ))}*/}
                    {/*        </Select>*/}
                    {/*    </div>*/}
                    {/*</div>*/}
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