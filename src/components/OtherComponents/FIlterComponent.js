import React from 'react';
import styles from '../../assets/styles/FilterComponent.module.css';
import filterStyle from "../../assets/styles/Filter.module.scss";
import Divider from "@material-ui/core/Divider";
import TextField from "@material-ui/core/TextField/TextField";

const FilterComponent = ({classes,toggleDrawer,statuses,industries,setStartDate,setEndDate,setStatus,setIndustries,setFilterParameters,setFilterNullable,startDate,endDate}) => {
    return(
        <div
            className={classes.list}
            role="presentation"
            // onClick={toggleDrawer(anchor, false)}
            // onKeyDown={toggleDrawer(anchor, false)}
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
                            <div onClick={()=>{
                                const copy = [...statuses];
                                for (let i=0;i<statuses.length;i++){
                                    if (statuses[i].value == el.value){
                                        console.log(statuses[i])
                                        copy[i].active = !copy[i].active;
                                        console.log(copy[i])
                                    }else{
                                        copy[i].active = false;
                                    }
                                }
                                setStatus(copy);
                            }} key={index} className={el.active === true ? `${filterStyle.status_type} ${filterStyle.active}` : `${filterStyle.status_type}`}>
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
                            <div onClick={()=>{
                                const copy = [...industries];
                                for (let i=0;i<industries.length;i++){
                                    if (industries[i].value == el.value){
                                        copy[i].active = !copy[i].active;
                                    }
                                }
                                setIndustries(copy);
                            }} key={index} className={el.active === true ? `${filterStyle.industry_type} ${filterStyle.active}` : `${filterStyle.industry_type}`}>
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
                        <TextField
                            onChange={(e)=>{
                                setStartDate(e.target.value);
                            }}
                            value={startDate}
                            placeholder={"От"}
                            style={{border:"1px solid #000"}}
                            className={`${filterStyle.textField} on`}
                            type={"date"}/>
                        <TextField
                            onChange={(e)=>{
                                setEndDate(e.target.value);
                            }}
                            value={endDate}
                            placeholder={"До"}
                            style={{border:"1px solid #000"}}
                            className={`${filterStyle.textField} on`}
                            type={"date"}/>
                    </div>
                </div>
                <div className={filterStyle.block_btnContainer}>
                    <div onClick={setFilterParameters} className={filterStyle.block_btn}>
                        Применить
                    </div>
                    <div onClick={setFilterNullable} className={filterStyle.cancel_btn}>
                        Сбросить параметры
                    </div>
                </div>
            </div>
        </div>
)
};

export default FilterComponent;