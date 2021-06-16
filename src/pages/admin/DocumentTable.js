import React, {useEffect, useState} from "react";
import styles from "../../assets/styles/AdminStyles/ProductionStyles/ProductionTable.module.scss";
import {ReactComponent as FilterIcon} from "../../assets/icons/filterIcon.svg";
import Select from "@material-ui/core/Select/Select";
import MenuItem from "@material-ui/core/MenuItem";
import AdminTableTitle from "../../components/AdminComponents/AdminTableTitle";
import DocumentTableContent from "./DocumentTableContent";
import {useDispatch} from "react-redux";
import {DOCUMENT_TABLE_SUCCESS} from "../../types/documentTypes";
import Drawer from "@material-ui/core/Drawer/Drawer";
import FilterComponent from "../../components/OtherComponents/FIlterComponent";
import FilterService from "../../services/FilterService";
import {makeStyles} from "@material-ui/core";
import {
    useLocation
} from "react-router-dom";

const useStyles = makeStyles({
    list: {
        width: 412,
    },
    fullList: {
        width: 'auto',
    },
});
const DocumentTable = ({data}) => {
    const dispatch = useDispatch();
    const location = useLocation();
    console.log(location)
    const [open, setOpen] = React.useState(false);
    const [tableTitle] = useState(['Наименование','Стратегический','Финансовый','юридический','маркетинг','Анкета']);
    const [sort, setSort] = React.useState('Наименованию');
    const [updown,setUpDown] = useState('up');    const [sortBy] = useState([
        "Наименованию",
        // "Статусу анкеты"
    ]);
    const [statuses, setStatus] = useState([
        {
            text: 'Ожидает проверку',
            value: 1,
            active: false
        },
        {
            text: 'Готово',
            value: 3,
            active: false
        }
    ]);
    const [industries, setIndustries] = useState(
        [
            {
                text: 'Общепит',
                value: 1,
                active: false
            },
            {
                text: 'Услуги',
                value: 2,
                active: false
            },
            {
                text: 'Развлечения',
                value: 3,
                active: false
            },
            {
                text: 'Производство',
                value: 4,
                active: false
            },
            {
                text: 'Торговля',
                value: 5,
                active: false
            },
            {
                text: 'Образование',
                value: 6,
                active: false
            }
        ]
    );
    const [startDate,setStartDate] = useState('');
    const [endDate,setEndDate] = useState('');

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
                    type: DOCUMENT_TABLE_SUCCESS,
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
                    type: DOCUMENT_TABLE_SUCCESS,
                    payload: copy
                })
            }
        }
    };


    const classes = useStyles();
    const [state, setState] = React.useState({
        top: false,
        left: false,
        bottom: false,
        right: false,
    });

    //FILTER ***********/

    const toggleDrawer = (anchor, open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        setState({...state, [anchor]: open});
    };


    const setFilterParameters = () => {
        let status = '';
        let industries_list = '';
        const from = startDate;
        const to = endDate;
        for (let i=0;i<statuses.length;i++){
            if (statuses[i].active){
                if (status.length>0){
                    status+=','+statuses[i].value
                }else{
                    status+=statuses[i].value
                }

            }
        }
        for (let i=0;i<industries.length;i++){
            if (industries[i].active){
                if (industries_list.length>0){
                    industries_list+=','+industries[i].value
                }else{
                    industries_list+=industries[i].value
                }
            }
        }
        if (location.pathname === '/admin/documents'){
            const response = new FilterService().setReady({
                status,
                industries: industries_list,
                from,
                to
            });
            response.then(res=>{
                dispatch({
                    type: DOCUMENT_TABLE_SUCCESS,
                    payload: res.data
                })
            });
        }else if (location.pathname === '/admin/production'){
            const response = new FilterService().setFilterDocuments({
                status,
                industries: industries_list,
                from,
                to
            });
            response.then(res=>{
                dispatch({
                    type: DOCUMENT_TABLE_SUCCESS,
                    payload: res.data
                })
            })
        }
        setUpDown('up')
    };

    const setFilterNullable = () => {
        setStatus([
            {
                text: 'Ожидает проверку',
                value: 0,
                active: false
            },
            {
                text: 'Готово',
                value: 1,
                active: false
            }
        ]);
        setIndustries([
            {
                text: 'Общепит',
                value: 1,
                active: false
            },
            {
                text: 'Услуги',
                value: 2,
                active: false
            },
            {
                text: 'Развлечения',
                value: 3,
                active: false
            },
            {
                text: 'Производство',
                value: 4,
                active: false
            },
            {
                text: 'Торговля',
                value: 5,
                active: false
            },
            {
                text: 'Образование',
                value: 6,
                active: false
            }
        ]);
        setStartDate('');
        setEndDate('');
        setUpDown('up');
        let status = '';
        let industries_list = '';
        const from = '';
        const to = '';
        if (location.pathname === '/admin/documents'){
            const response = new FilterService().setReady({
                status,
                industries: industries_list,
                from,
                to
            });
            response.then(res=>{
                dispatch({
                    type: DOCUMENT_TABLE_SUCCESS,
                    payload: res.data
                })
            });
        }else if (location.pathname === '/admin/production'){
            const response = new FilterService().setFilterDocuments({
                status,
                industries: industries_list,
                from,
                to
            });
            response.then(res=>{
                dispatch({
                    type: DOCUMENT_TABLE_SUCCESS,
                    payload: res.data
                })
            })
        }
    };

    const list = (anchor) => (
        <FilterComponent
            classes={classes}
            toggleDrawer={toggleDrawer}
            statuses={statuses}
            setStatus={setStatus}
            industries={industries}
            setIndustries={setIndustries}
            startDate={startDate}
            setStartDate={setStartDate}
            endDate={endDate}
            setEndDate={setEndDate}
            setFilterParameters={setFilterParameters}
            setFilterNullable={setFilterNullable}
        />
    );

    /******************/


    return(
        <div className={styles.container}>
            <div className={styles.table}>
                <Drawer anchor={"right"} open={state['right']}
                        onClose={toggleDrawer('right', false)}
                >
                    {list("right")}
                </Drawer>
                <div className={styles.table_header}>
                    <div onClick={toggleDrawer('right', true)} className={styles.filter}>
                        <div className={styles.filter_title}>Фильтр</div>
                        <div className={styles.filter_icon}><FilterIcon/></div>
                    </div>
                    <div className={styles.sort_container}>
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
                    <div className={styles.updown}>
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
                        <DocumentTableContent data={data}/>
                    </table>
                </div>
            </div>
        </div>
    )
};

export default DocumentTable;