import React, {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import styles from '../../assets/styles/FaqStyles/FaqList.module.scss'
import Plus from '../../assets/icons/plus.svg'
import redPlus from '../../assets/icons/plusRed.svg'
import Minus from '../../assets/icons/minus.svg'


const FaqList = ({faqData=[
    {id:1,title:'Вопрос 1',text:"Текст 1"},
    {id:2,title:'Вопрос 2',text:"Текст 2"},
    {id:3,title:'Вопрос 3',text:"Текст 3"},
    {id:4,title:'Вопрос 4',text:"Текст 4"},
    {id:5,title:'Вопрос 5',text:"Текст 5"},
]}) => {
    const [hover,setHover] = useState('');
    const [open,setOpen] = useState('');

    console.log(faqData)

    const handleOpen = (id) => {
        if (open!==id){
            setOpen(id)
        }else{
            setOpen('')
        }
    };

    // useEffect(()=>{
    //     setOpen('')
    // },[faqData]);


    return(
        <div className={styles.faqList}>
            {faqData.map((el,index)=>(
                <div key={index} onClick={()=>handleOpen(el.id)} onMouseEnter={()=>setHover(el.id)} onMouseLeave={()=>setHover('')}  className={styles.rowContainer}>
                <div className={styles.faqRow}>
                            {open !==el.id ? (
                                <>
                                    <div key={index} className={styles.faqTitle}>{el.title}</div>
                                    {hover === el.id ? (
                                        <div>
                                            <img src={redPlus} alt="plus"/>
                                        </div>
                                    ):(
                                        <div>
                                            <img src={Plus} alt="plus"/>
                                        </div>
                                    )}
                                </>
                            ):(
                                <>
                                    <div style={{color: "red"}} key={index} className={styles.faqTitle}>{el.title}</div>
                                    <div style={{transition:'.4s'}}>
                                        <img src={Minus} alt="minus"/>
                                    </div>
                                </>
                            )}
                </div>
                    {open === el.id ? (
                        <div className={styles.faqText}>{el.text}</div>
                    ):(
                        <div></div>
                    )}
                </div>
            ))}
        </div>
    )
};
export default FaqList