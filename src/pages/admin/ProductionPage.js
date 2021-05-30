import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getProductionTableAction} from "../../redux/actions/getProductionTableAction";
import AdminTitle from "../../components/AdminComponents/AdminTitle";
import ProductionTable from "../../components/AdminComponents/production/ProductionTable";
import AdminTabs from "../../components/AdminComponents/AdminTabs";
import styles from "../../assets/styles/AdminStyles/AdminTabs.module.scss";
import styles2 from '../../assets/styles/AdminStyles/AdminTabs.module.scss'
import {getQuestionnaireTableAction} from "../../redux/actions/getQuestionnaireTableAction";
import QuestionnaireTable from "../../components/AdminComponents/QuestionnaireTable";



const ProductionPage = () => {
    const dispatch = useDispatch();
    const {data} = useSelector(state => state.ProductionPage);
    const data2 = useSelector(state => state.QuestionnairePage.data);

    const [active,setActive] = useState(1);

    useEffect(()=>{
        document.title = "ScaleUp | Анкета"
        dispatch(getProductionTableAction());
        dispatch(getQuestionnaireTableAction());
    },[]);

    return(
        <div style={{paddingTop:20, height: '100vh'}}>
            <AdminTitle
                title={"Анкеты"}
                description={"Общее количество компании"}
                count={data.length+data2.length}
            />
            <div className={styles2.container}>
                <div className={styles2.tabs} style={{justifyContent:'flex-start'}}>
                    <div
                        onClick={()=>setActive(1)}
                        className={ active === 1 ? `${styles.tab} ${styles.active}`: `${styles.tab}`}
                    >Не отправленные<span className={styles.count}>({data2 ? data2.length : '0'})</span></div>
                    <div
                        style={{marginLeft:'20px'}}
                        onClick={()=>setActive(2)}
                        className={ active === 2 ? `${styles.tab} ${styles.active}`: `${styles.tab}`}
                    >Отправленные<span className={styles.count}>({data ? data.length : '0'})</span></div>
                </div>
            </div>
            {active === 1 && (
                <QuestionnaireTable
                    data={data2}
                />
            )}
            {active === 2 && (
                <ProductionTable
                    data={data}
                />
            )}
        </div>
    )
};

export default ProductionPage