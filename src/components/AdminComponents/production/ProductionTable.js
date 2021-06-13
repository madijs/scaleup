import React, {useState} from "react";
import styles from "../../../assets/styles/AdminStyles/ProductionStyles/ProductionTable.module.scss"
import {ReactComponent as FilterIcon} from "../../../assets/icons/filterIcon.svg";
import Select from "@material-ui/core/Select/Select";
import MenuItem from "@material-ui/core/MenuItem";
import AdminTableTitle from "../AdminTableTitle";
import ProductionTableContent from "./ProductionTableContent";
import {PRODUCTION_TABLE_SUCCESS, QUESTIONNAIRE_TABLE_SUCCESS} from "../../../types/AdminTypes";
import {useDispatch} from "react-redux";
import Drawer from "@material-ui/core/Drawer/Drawer";
import FilterComponent from "../../OtherComponents/FIlterComponent";
import FilterService from "../../../services/FilterService";
import {makeStyles} from "@material-ui/core";
const useStyles = makeStyles({
    list: {
        width: 412,
    },
    fullList: {
        width: 'auto',
    },
});
const ProductionTable = ({data}) => {
    const dispatch = useDispatch();
    const [open, setOpen] = React.useState(false);
    const [tableTitle] = useState(['Наименование', 'Стратегический', 'Финансовый', 'юридический', 'маркетинг', 'Анкета']);
    const [sort, setSort] = React.useState('Наименованию');
    const [updown, setUpDown] = useState('up');
    const [sortBy] = useState([
        "Наименованию",
        "Номеру телефона"
    ]);
    const [statuses, setStatus] = useState([
        {
            text: 'К проверке',
            value: 0,
            active: false
        },
        {
            text: 'Проверяю',
            value: 1,
            active: false
        },
        {
            text: 'Требуется исправление',
            value: 2,
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
        if (event.target.value === "Наименованию") {
            if (updown === 'down') {
                const copy = [...data];
                copy.sort(function (a, b) {
                    if (a.user.company.toLowerCase() < b.user.company.toLowerCase()) {
                        return -1;
                    }
                    if (a.user.company.toLowerCase() > b.user.company.toLowerCase()) {
                        return 1;
                    }
                    return 0;
                });
                dispatch({
                    type: PRODUCTION_TABLE_SUCCESS,
                    payload: copy
                })
            } else {
                const copy = [...data];
                copy.sort(function (a, b) {
                    if (a.user.company.toLowerCase() > b.user.company.toLowerCase()) {
                        return -1;
                    }
                    if (a.user.company.toLowerCase() < b.user.company.toLowerCase()) {
                        return 1;
                    }
                    return 0;
                });
                dispatch({
                    type: PRODUCTION_TABLE_SUCCESS,
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
        const response = new FilterService().setFilterProductions({
            status,
            industries: industries_list,
            from,
            to
        });
        response.then(res=>{
            dispatch({
                type: PRODUCTION_TABLE_SUCCESS,
                payload: res.data
            })
        });
        setUpDown('up')
    };

    const setFilterNullable = () => {
        setStartDate('');
        setEndDate('');
        setStatus([
            {
                text: 'К проверке',
                value: 0,
                active: false
            },
            {
                text: 'Проверяю',
                value: 1,
                active: false
            },
            {
                text: 'Требуется исправление',
                value: 2,
                active: false
            },
            {
                text: 'Готово',
                value: 3,
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
        ])
        setUpDown('up');
        let status = '';
        let industries_list = '';
        const from = '';
        const to = '';
        const response = new FilterService().setFilterProductions({
            status,
            industries: industries_list,
            from,
            to
        });
        response.then(res=>{
            dispatch({
                type: PRODUCTION_TABLE_SUCCESS,
                payload: res.data
            })
        });
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

    /************************************/

    return (
        <div className={styles.container}>
            <div className={styles.table}>
                <div className={styles.table_header}>
                    <Drawer anchor={"right"} open={state['right']}
                            onClose={toggleDrawer('right', false)}
                    >
                        {list("right")}
                    </Drawer>
                    <div onClick={toggleDrawer('right', true)}  className={styles.filter}>
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
                                {sortBy.map((el, index) => (
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
                        <ProductionTableContent data={data}/>
                    </table>
                </div>
            </div>
        </div>
    )
};

export default ProductionTable;