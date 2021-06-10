import React, {useEffect, useState} from "react";
import styles from "../../assets/styles/AdminStyles/QuestionTable.module.scss"
import {ReactComponent as FilterIcon} from "../../assets/icons/filterIcon.svg";
import Select from "@material-ui/core/Select/Select";
import MenuItem from "@material-ui/core/MenuItem";
import AdminTableTitle from "./AdminTableTitle";
import QuestionnaireTableContent from "./QuestionnaireTableContent";
import {QUESTIONNAIRE_TABLE_SUCCESS} from "../../types/AdminTypes";
import {useDispatch} from "react-redux";
import {makeStyles} from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import filterStyle from "../../assets/styles/Filter.module.scss";
import TextField from "@material-ui/core/TextField";
import '../../assets/styles/OtherStyles/TextField.scss'

const useStyles = makeStyles({
    list: {
        width: 412,
    },
    fullList: {
        width: 'auto',
    },
});
const QuestionnaireTable = ({data}) => {
    const dispatch = useDispatch();
    const [open, setOpen] = React.useState(false);
    const [sort, setSort] = React.useState('Наименованию');
    const [updown, setUpDown] = useState('up');
    const [statuses, setStatus] = useState([
        {
            text: 'Пустая',
            value: 1,
            active: false
        },
        {
            text: 'В работе',
            value: 2,
            active: false
        },
        {
            text: 'Сохранена',
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
                    type: QUESTIONNAIRE_TABLE_SUCCESS,
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
                    type: QUESTIONNAIRE_TABLE_SUCCESS,
                    payload: copy
                })
            }
        }
    };

    const [tableTitle] = useState(['Наименование', 'Стратегический', 'Финансовый', 'юридический', 'маркетинг', 'Анкета']);


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

    const list = (anchor) => (
        <div
            className={classes.list}
            role="presentation"
            // onClick={toggleDrawer(anchor, false)}
            onKeyDown={toggleDrawer(anchor, false)}
        >
            <div onClick={toggleDrawer('right', false)} className={filterStyle.close}>
            </div>
            <div className={filterStyle.title}>
                Фильтр
            </div>
            <Divider/>
            <div className={filterStyle.content}>
                <div className={filterStyle.status}>
                    <div className={filterStyle.status_title}>
                        По статусам анкет
                    </div>
                    <div className={filterStyle.status_types}>
                        {statuses.map((el, index) => (
                            <div key={index} className={filterStyle.status_type}>
                                {el.text}
                            </div>
                        ))}
                    </div>
                </div>
                <div className={filterStyle.industries}>
                    <div className={filterStyle.industries_title}>
                        Отрасли
                    </div>
                    <div className={filterStyle.industries_list}>
                        {industries.map((el, index) => (
                            <div key={index} className={filterStyle.industry_type}>
                                {el.text}
                            </div>
                        ))}
                    </div>
                </div>
                <div className={filterStyle.period}>
                    <div className={filterStyle.period_title}>
                        Период
                    </div>
                    <div className={filterStyle.period_types}>
                        <TextField className={`${filterStyle.textField} on`} type={"date"}/>
                    </div>
                </div>
            </div>
        </div>
    );
    /******************/

    return (
        <div className={styles.container}>
            <div className={styles.table}>
                <div className={styles.table_header}>
                    <Drawer anchor={"right"} open={state['right']}
                            onClose={toggleDrawer('right', false)}
                    >
                        {list("right")}
                    </Drawer>
                    <div onClick={toggleDrawer('right', true)} className={styles.filter}>
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
                                <div onClick={() => {
                                    setUpDown('down');
                                    handleChange({
                                        target: {
                                            value: sort
                                        }
                                    })
                                }} className={`${styles.arrow} ${styles.up}`}></div>
                            ) : (
                                <div onClick={() => {
                                    setUpDown('up');
                                    handleChange({
                                        target: {
                                            value: sort
                                        }
                                    })
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