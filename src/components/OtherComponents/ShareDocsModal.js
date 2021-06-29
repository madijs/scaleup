import React, {useEffect, useState} from "react";
import styles from "../../assets/styles/ShareDocsModal.module.scss"
import DocumentService from "../../services/DocumentService";
import {getMeInfoAction} from "../../redux/actions/getMeInfo";
import {useDispatch} from "react-redux";

const ShareDocsModal = ({userData,closePopupHandleChange}) => {
    const dispatch= useDispatch();
    const [token,setToken] = useState(null);
    const [isCopied,setCopy] = useState(false);
    const [isStrategyChecked,setStrategyChecked] = useState(false);
    const [isMarketingChecked,setMarketingChecked] = useState(false);
    const [isLegalChecked,setLegalChecked] = useState(false);
    const [isFinancialChecked,setFinancialChecked] = useState(false);

    useEffect(()=>{
        dispatch(getMeInfoAction());
        setToken(userData.public_document.token)
    },[]);

    useEffect(()=>{
        if (userData){
            if (userData.public_document){
                if (userData.public_document.strategy === '1'){
                    setStrategyChecked(true);
                }else setStrategyChecked(false);

                if (userData.public_document.legal === '1'){
                    setLegalChecked(true);
                }else setLegalChecked(false);

                if (userData.public_document.financial === '1'){
                    setFinancialChecked(true);
                }else setFinancialChecked(false);

                if (userData.public_document.marketing === '1'){
                    setMarketingChecked(true);
                }else setMarketingChecked(false);
            }
        }
    },[userData]);

    const handleChange = (section,value) => {
        let val = '0';
        if (value === true){
            val = '1'
        }
        const response = new DocumentService().shareDocs(section,val);
        response.then(res=>{
            if (section === 'strategy'){
                if (res.data.strategy === '1'){
                    setStrategyChecked(true)
                }else{
                    setStrategyChecked(false)
                }
            }
            if (section === 'legal'){
                if (res.data.legal === '1'){
                    setLegalChecked(true);
                }else{
                    setLegalChecked(false);
                }
            }
            if (section === 'financial'){
                if (res.data.financial === '1'){
                    setFinancialChecked(true);
                }else{
                    setFinancialChecked(false);
                }
            }
            if (section === 'marketing'){
                if (res.data.marketing === '1'){
                    setMarketingChecked(true);
                }else{
                    setMarketingChecked(false);
                }
            }
            setToken(res.data.token)
        })
    };

    return(
        <div className={styles.modal}>
            <div onClick={closePopupHandleChange} className={styles.close}>
            </div>
            <div className={styles.title}>Поделиться</div>
            <div className={styles.content}>
                <div className={styles.content_title}>
                    Выберите раздел
                </div>
                <div className={styles.sections}>
                    <div className={styles.section_item}>
                        <input checked={isStrategyChecked} onChange={(e)=>handleChange("strategy",!isStrategyChecked)} type="checkbox"/>
                        <label htmlFor="">Стратегический раздел</label>
                    </div>
                    <div className={styles.section_item}>
                        <input checked={isLegalChecked} onChange={(e)=>handleChange("legal",!isLegalChecked)} type="checkbox"/>
                        <label htmlFor="">Юридический раздел</label>
                    </div>
                    <div className={styles.section_item}>
                        <input checked={isFinancialChecked} onChange={(e)=>handleChange("financial",!isFinancialChecked)} type="checkbox"/>
                        <label htmlFor="">Финансовый раздел</label>
                    </div>
                    <div className={styles.section_item}>
                        <input checked={isMarketingChecked} onChange={(e)=>handleChange("marketing", !isMarketingChecked)} type="checkbox"/>
                        <label htmlFor="">Маркетинговый раздел</label>
                    </div>
                </div>
                <div className={styles.link_container}>
                    <div className={styles.link}>
                        <input value={`http://platform.scaleup.plus/shared?token=${userData && userData.public_document && token}`} type="text"/>
                    </div>
                    {!isCopied ? (
                        <button onClick={()=>{
                            try {
                                navigator.clipboard.writeText(`http://platform.scaleup.plus/shared?token=${userData && userData.public_document && userData.public_document.token}`);
                                setCopy(true)
                            }catch (e) {

                            }
                        }} className={styles.link_btn}>
                            Копировать ссылку
                        </button>
                    ):(
                        <button className={styles.success_link_btn}>
                            Успешно скопирована!
                        </button>
                    )}
                </div>
            </div>
            <div className={styles.closeBtn}>
                <div onClick={closePopupHandleChange} className={styles.close_btn}>Закрыть</div>
            </div>
        </div>
    )
};

export default ShareDocsModal;