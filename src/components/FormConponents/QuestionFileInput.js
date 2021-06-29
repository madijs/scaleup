import React, {useEffect, useState} from "react";
import styles from "../../assets/styles/FormStyles/QuestionFileInput.module.scss"
import trashIcon from "../../assets/icons/trashIcon.svg";
import AnketaService from "../../services/AnketaService";
import getMediaUrls from "../../tools/getMediaUrls";
import axios from "../../plugins/axios"
import Comment from "../../assets/icons/comment.svg";
import {useDispatch, useSelector} from "react-redux";
import {CHECK_COMPLETED_ANSWERS, SAVE_FILE_IN_ANKETA} from "../../types/anketaTypes";
import QuestionCheckboxInput from "./QuestionCheckboxInput";

const QuestionFileInput = ({title = "",  saveAnketa,text = "", questionsData, id, getStrategyQuestion = null, getFinancial = null, setOpen, setInfo, commentOpen, commentInfo,user_id,allData,section}) => {
    const [form, setForm] = useState(questionsData ? questionsData : null);
    const [error, setError] = useState(form.answer ? (form.answer.commentary ? (form.answer.commentary.read == 0 ? true : false) : false) : false);
    const dispatch = useDispatch();
    const {userData} = useSelector(state => state.AuthPage);

    const hiddenFileInput = React.useRef(null);

    const handleClick = event => {
        hiddenFileInput.current.click();
    };

    const handleChange = event => {
        if (questionsData.type == 3) {
            const copy = {...form};
            let arr;
            console.log(copy);
            if (copy.answer && copy.answer.answers) {
                arr = [...form.answer.answers];
            } else {
                arr = [];
            }
            copy.answer = {...form.answer};
            arr.push(event.target.files[0]);
            copy.answer.answers = arr;
            setForm(copy);
            const response = new AnketaService().saveForm(id, copy.answer.answers, 3,user_id,section);
            response.then(res => {
                dispatch({
                    type: SAVE_FILE_IN_ANKETA,
                    id: res.data.form_id,
                    payload: res.data
                });
                console.log(allData);
                dispatch({
                    type: CHECK_COMPLETED_ANSWERS,
                    payload: allData
                });
                saveAnketa('file');
                getStrategyQuestion()
            })
        }
    };

    const deleteFile = (index) => {
        let arr = [];
        for (let i = 0; i < form.answer.answers.length; i++) {
            if (i !== index) {
                arr.push(form.answer.answers[i])
            }
        }
        const copy = {...form};
        copy.answer = {...form.answer};
        copy.answer.answers = [...form.answer.answers];
        copy.answer.answers = arr;
        setForm(copy);
        const response = new AnketaService().saveForm(id, copy.answer.answers, 3,'',section);
        response.then(res => {
            dispatch({
                type: SAVE_FILE_IN_ANKETA,
                id: id,
                payload: null
            });
            // getStrategyQuestion()
        })
    };

    useEffect(()=>{
        setForm(questionsData);
        let a = false;
        if (questionsData.answer){
            if (questionsData.answer.commentary){
               if (questionsData.answer.commentary.read === 0){
                   setError(true);
                   a = true;
                   console.log('error')
               }
            }
        }
        if (!a){
            setError(false);
            console.log("checked")
        }
    },[questionsData]);

    const downloadFile = (file) => {

        const response =  axios({
            url: 'http://platformapi.scaleup.plus/api/get-answer-file', //your url
            method: 'GET',
            responseType: 'blob',// important
            params: {
                link: file
            }
        });
        response.then(res=>{
            const url = window.URL.createObjectURL(new Blob([res.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', file); //or any other extension
            document.body.appendChild(link);
            link.click();
        });
    };


    return (
        <div className={styles.root}>
            {/*{title && (*/}
            {/*    <div className={styles.title}>*/}
            {/*        {title}*/}
            {/*    </div>*/}
            {/*)}*/}
            <div className={styles.head}>
                <div className={styles.title}>{text}</div>
                {error && (
                    <div className={styles.warning}>
                        <img
                            onClick={() => {
                            //     if (commentInfo) {
                            //         if (commentInfo.answer_id == form.answer.commentary.answer_id) {
                                        setOpen(!commentOpen);
                            //         } else {
                                        setInfo(form.answer.commentary);
                            //         }
                            //     } else {
                            //         setOpen(!commentOpen);
                            //         setInfo(form.answer.commentary);
                            //     }
                             }}
                            className={styles.comment}
                            src={Comment} alt=""/>
                    </div>
                )}
            </div>
            <div className={styles.file_container}>
                <div>
                    <input
                        type="file"
                        ref={hiddenFileInput}
                        disabled={userData && (userData.roles[0].name === "editor" || userData.roles[0].name === "marketer" || userData.roles[0].name === "financier" || userData.roles[0].name==="lawyer")}
                        onChange={handleChange}
                        style={{display: 'none'}}/>
                    <div className={styles.file_select}>
                        {form ? (form.answer ? (form.answer.disabled == 1 ? (
                            <span className={styles.disabledSpan}>Выберите файл </span>
                        ):<span onClick={handleClick}>Выберите файл </span>):<span onClick={handleClick}>Выберите файл </span>):<span onClick={handleClick}>Выберите файл </span>}
                    </div>
                    <div className={styles.subtitle}>Файлы не должны превышать 10 мб</div>
                </div>
            </div>
            <div>
                {form && (
                    <div className={styles.files}>
                        {form.answer && form.answer.answers && form.answer.answers.map((el, index) => (
                            <>
                                {el.name ? (
                                    <div onClick={()=>alert('qwe')} className={styles.fileName} key={index}>
                                        {el.name}
                                    </div>
                                ) : (
                                    <div onClick={()=>downloadFile(el)} className={styles.fileName} key={index}>
                                        {el}
                                    </div>
                                )}
                                <div onClick={() => {
                                    if (form.answer.disabled == 0){
                                        deleteFile(index)
                                    }
                                }}
                                     style={{display: "flex", alignItems: 'center', marginLeft: 10}}>
                                    <img style={{color: 'red'}} src={trashIcon} alt="trash"/>
                                </div>
                            </>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
};

export default QuestionFileInput;