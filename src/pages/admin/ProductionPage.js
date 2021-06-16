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
import {Route} from 'react-router-dom';
import {useLocation, useHistory} from "react-router-dom";

const ProductionPage = () => {
    const dispatch = useDispatch();
    const {data} = useSelector(state => state.ProductionPage);
    const data2 = useSelector(state => state.QuestionnairePage.data);
    const location = useLocation();
    const [active,setActive] = useState(1);
    const history = useHistory();

    useEffect(()=>{
        document.title = "ScaleUp | Анкета"
        dispatch(getProductionTableAction());
        dispatch(getQuestionnaireTableAction());

    },[]);

    useEffect(()=>{
        if (location.pathname === '/admin/questionnaire/tables/2'){
            setActive(2);
        }else{
            setActive(1);
        }
    },[location.pathname]);

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
                        onClick={()=>{
                            setActive(1);
                            history.push('/admin/questionnaire/tables');
                        }}
                        className={ active === 1 ? `${styles.tab} ${styles.active}`: `${styles.tab}`}
                    >Не отправленные<span className={styles.count}>({data2 ? data2.length : '0'})</span></div>
                    <div
                        style={{marginLeft:'20px'}}
                        onClick={()=>{
                            setActive(2);
                            history.push('/admin/questionnaire/tables/2');
                        }}
                        className={ active === 2 ? `${styles.tab} ${styles.active}`: `${styles.tab}`}
                    >Отправленные<span className={styles.count}>({data ? data.length : '0'})</span></div>
                </div>
            </div>

            {active === 1 && (
                <QuestionnaireTable
                    data={data2}
                />
            )}
            <Route exact path={'/admin/questionnaire/tables/2'} render={()=><ProductionTable
                data={data}
            />}/>
            {/*{active === 2 && (*/}
            {/*    // <ProductionTable*/}
            {/*    //     data={data}*/}
            {/*    // />*/}
            {/*)}*/}
        </div>
    )
};

export default ProductionPage