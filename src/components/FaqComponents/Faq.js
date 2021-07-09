import React, {useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import styles from '../../assets/styles/FaqStyles/Faq.module.scss'
import {useDispatch, useSelector} from "react-redux";
import {getFaqListAction} from "../../redux/actions/getFaqListAction";
import {useHistory} from 'react-router-dom';
import FaqList from "./FaqList";
import {useLocation} from "react-router-dom"

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
    const classes = useStyles();

    // useEffect(()=>{
    //     dispatch(getFaqListAction());
    // },[]);

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
                           <FaqList faqDatas={faqData} location={location}/>
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