import React from "react";
import PropTypes from 'prop-types';
import styles from '../../assets/styles/OtherStyles/GoBack.module.scss'
import ArrowLeft from '../../assets/icons/arrow-left.svg'
import {useHistory} from 'react-router-dom'

const GoBack = ({title="",subtitle="",path=null,action=null,unauthorized=false}) => {
    const history = useHistory();
    return(
        <div className={styles.goback_container}>
            <div className={styles.goBack_title}>
                {!unauthorized && (
                    <div onClick={()=> {
                        if (path!==null){
                            history.push(path)
                        }else{
                            history.goBack()
                        }
                        if (action){
                            action();
                        }
                    }} className={styles.goBack_title_icon}>
                        <img src={ArrowLeft} alt=""/>
                    </div>
                )}
                <div className={styles.goBack_title_text}>
                    <h2>{title}</h2>
                </div>
            </div>
            <div className={styles.goBack_subtitle}>
                {subtitle}
            </div>
        </div>
    )
};

GoBack.propTypes = {
    title: PropTypes.string, // название страницы
    subtitle: PropTypes.string // краткая информация страницы
};

export default GoBack;