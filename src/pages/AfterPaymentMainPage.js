import React, {useEffect, useState} from "react";
import styles from '../assets/styles/MainStyles/AfterPaymentMainPage.module.scss'
import Icon1 from '../assets/icons/mainIcon1.svg'
import Icon2 from '../assets/icons/mainIcon2.svg'
import Icon3 from '../assets/icons/mainIcon3.svg'
import Icon4 from '../assets/icons/mainIcon4.svg'
import Faq from "../components/FaqComponents/Faq";
import MainItem from "../components/MainComponents/MainItem";
import MainService from "../services/MainService";
import RocketBlock from "../components/FormConponents/RocketBlock";
import AnketaProgress from "../components/FormConponents/AnketaProgress";
import CircularIndeterminate from "../components/FormConponents/ProgressCircle";
import {useSelector} from "react-redux";
import {useHistory} from "react-router-dom";
import DocumentService from "../services/DocumentService";

const textStyle = {
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: 16,
    lineHeight: '22px',
    textAlign: 'center',
    color: '#171717'
};
const AfterPaymentMainPage = () => {
    const history = useHistory();
    const [sections,setSections] = useState(null);
    const [sectionTitles] = useState(["strategy","financial","legal","marketing"]);
    const {userData} = useSelector(state => state.AuthPage);
    const [rocketStatus,setRocketStatus] = useState(-1);
    const [docsEmpty,setDocsIsEmpty] = useState(true);


    useEffect(()=>{
        const response = new MainService().getSections();
        response.then(res=>{
            setSections(res.data);
            if (res.data[0].worksheet){
                if ((res.data[0].worksheet.strategy == 3 &&
                    res.data[0].worksheet.marketing == 3 &&
                    res.data[0].worksheet.financial == 3 &&
                    res.data[0].worksheet.legal == 3) && res.data[0].worksheet.sended == 0) {
                    setRocketStatus(0);
                }
                // else if (res.data[0].worksheet.sended == 3 || userData.production){
                //     setRocketStatus(1);
                // }
            }else
                if (userData && userData.production){
                setRocketStatus(1);
            }
        });
        response.catch(err=>{
            console.log(err)
        });
        const response2 = new DocumentService().getUserFiles(userData.id);
        response2.then(res=>{
            setDocsIsEmpty(false);
        }).catch(err=>{
            setDocsIsEmpty(true);
        });
    },[]);

    useEffect(()=>{
        if (rocketStatus === 1){
            setTimeout(()=>{
                setRocketStatus(2)
            },2000)
        }
    },[rocketStatus]);

    return(
        <div className={styles.container}>
            <div className={styles.mainPageContainer}>
                <div className={styles.title}>
                    Главная
                </div>
                {userData && userData.docs == "0" ? (
                    <div className={styles.subtitle}>
                        Вам необходимо заполнить все анкеты
                    </div>
                ):(
                    <div className={styles.subtitle}>
                        Ваши документы готовы, перейдите в <span onClick={()=>history.push('/my-documents')} style={{color:"#FF494D",fontWeight:'bold',cursor:"pointer"}}>мои документы</span>, чтобы скачать
                    </div>
                )}
                {rocketStatus === 0 ? (
                    <div style={{marginTop:32}}>
                        <RocketBlock setRocketStatus={setRocketStatus}/>
                    </div>
                ):(rocketStatus === 1 ? (
                    <div style={{marginTop: 32}}>
                        <div style={{width:'100%',height:'330px',background: '#FFFFFF',
                            boxShadow: '0px 10px 20px rgba(41, 41, 42, 0.07)',
                            borderRadius: '24px',display:'flex',justifyContent:'center',alignItems:'center'}}>
                            <div>
                                <CircularIndeterminate/>
                                <div style={textStyle}>Подождите... Идет проверка</div>
                            </div>
                        </div>
                    </div>
                ):(rocketStatus === 2 && (
                    <div style={{marginTop:32}}>
                        <AnketaProgress docsEmpty={docsEmpty}/>
                    </div>
                )))}
                <div className={styles.mainPageBlocks}>
                    {sections && sections.map((el,index)=>(
                        <MainItem
                            answers_count={el.answers_count}
                            forms_count={el.forms_count}
                            id={el.id}
                            key={el.id}
                            title={el.name}
                            description={el.description}
                            link={el.link}
                            status={el.status}
                            subtitle={`${el.forms_count} вопросов`}
                            sectionTitle={sectionTitles[index]}
                            icon={el.id === 1 ? Icon1 : el.id === 2 ? Icon2 : el.id === 3 ? Icon3 : Icon4}/>
                    ))}
                </div>
            </div>
            <Faq/>
        </div>
    )
};

export default AfterPaymentMainPage;