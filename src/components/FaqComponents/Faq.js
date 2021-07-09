import React, {useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import styles from '../../assets/styles/FaqStyles/Faq.module.scss'
import {useDispatch, useSelector} from "react-redux";
import {getFaqListAction} from "../../redux/actions/getFaqListAction";
import {useHistory} from 'react-router-dom';
import FaqList from "./FaqList";
import {useLocation} from "react-router-dom"
import {getJustFaqsAction} from "../../redux/actions/getJustFaqsAction";

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular,
    },
}));

const Faq = ({faqData=[]}) => {
    const location = useLocation();
    const history = useHistory();
    // const {faqData} = useSelector(state => state.MainPage);
    const dispatch = useDispatch();
    const [faq,setFaqData] = useState(null);
    const classes = useStyles();

    // useEffect(()=>{
    //     dispatch(getFaqListAction());
    // },[]);

    useEffect(()=>{
        if (location.pathname.includes('/form/strategy') || location.pathname.includes('/form/financial') || location.pathname.includes('/form/marketing') || location.pathname.includes('/form/legal')){
            const response2 = dispatch(getJustFaqsAction());
            response2.then(res=>{
                for (let i=0;i<res.data.length;i++){
                    if (res.data[i].id == 2){
                        setFaqData(res.data[i].faqs)
                    }
                }
                console.log(res.data);
            })
        }
    },[]);

    return(
        <>
           <div className={styles.faq}>
               <div className={styles.container}>
                   <div className={styles.container_2}>
                       <div className={styles.faq_title}>
                           Часто задаваемые вопросы
                       </div>
                       <div className={styles.faq_text}>
                           {/*Learn from a growing library of 1,982 websites and 3,829 component examples. Easily filterable to find the inspiration you need, quickly.*/}
                       </div>
                       {faqData && (
                           <FaqList faqDatas={faq ? faq : faqData} location={location}/>
                       )}
                       <div onClick={()=>history.push('/faq')} className={styles.allQuestions}>
                           Все вопросы-ответы
                       </div>
                   </div>
               </div>
           </div>
        </>
    )
};

export default Faq;