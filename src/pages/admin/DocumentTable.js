import React, {useEffect, useState} from "react";
import styles from "../../assets/styles/AdminStyles/ProductionStyles/ProductionTable.module.scss";
import {ReactComponent as FilterIcon} from "../../assets/icons/filterIcon.svg";
import Select from "@material-ui/core/Select/Select";
import MenuItem from "@material-ui/core/MenuItem";
import AdminTableTitle from "../../components/AdminComponents/AdminTableTitle";
import DocumentTableContent from "./DocumentTableContent";

const DocumentTable = ({data}) => {
    console.log(data);
    const [open, setOpen] = React.useState(false);
    const [tableTitle] = useState(['Наименование','Стратегический','Финансовый','юридический','маркетинг','Анкета']);
    const [sort, setSort] = React.useState('Наименованию');
    const [sortBy] = useState([
        "Наименованию",
        // "Статусу анкеты"
    ]);
    // const [doc_data,setData] = useState(null);
    //
    // useEffect(()=>{
    //     setData(data)
    // },[data]);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleChange = (event) => {
        setSort(event.target.value);
        // if (event.target.value === "Наименованию"){
        //     data.sort(function(a, b){
        //         console.log(a);
        //         if(a.user.company.toLowerCase() < b.user.company.toLowerCase()) {
        //             return -1; }
        //         if(a.user.company.toLowerCase() > b.user.company.toLowerCase()) {
        //             return 1; }
        //         return 0;
        //     });
        //     setData(data);
        // }
    };

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
                        </div>
                    </div>
                </div>
                <div className={styles.admin_table_title}>
                    <table rules="none">
                        <AdminTableTitle data={tableTitle}/>
                        <DocumentTableContent data={data}/>
                    </table>
                </div>
            </div>
        </div>
    )
};

export default DocumentTable;