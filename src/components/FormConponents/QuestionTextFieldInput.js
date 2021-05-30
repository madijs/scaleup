import React, {useEffect, useState} from "react";
import PropTypes from 'prop-types';
import styles from '../../assets/styles/FormStyles/QuestionTextFieldInput.module.scss';
import TextField from "@material-ui/core/TextField/TextField";
import AnketaService from "../../services/AnketaService";
import InputAdornment from "@material-ui/core/InputAdornment";
import Comment from "../../assets/icons/comment.svg"
import validateEmail from "../../tools/validateEmail";
import {useDispatch, useSelector} from "react-redux";
import {CHECK_COMPLETED_ANSWERS, SET_INPUT_ANKETA_VALUE} from "../../types/anketaTypes";
import {returnDateFormat} from "../../tools/returnDateFormat";
import trashIcon from "../../assets/icons/trashIcon.svg";
import lep from "../../assets/icons/lep.svg";

const QuestionTextFieldInput = ({readIt,answer,allData,questionNumber,index,id,title="",text="",placeholder="",require=false,questionsData,getStrategyQuestion,setOpen,setInfo,commentOpen,commentInfo,user_id}) => {
    const [focus,setFocus] = useState(false);
    const dispatch = useDispatch();
    const {userData} = useSelector(state => state.AuthPage);
    const [error,setError] = useState(questionsData.answer ? (questionsData.answer.commentary ? (questionsData.answer.commentary.read == 0 ? true : false) : false) : false);
    console.log(questionsData)
    const sendAnswer = () => {
        if (questionsData.answer){
            if (userData.roles[0].name == "client"){
                const response = new AnketaService().saveForm(id,questionsData.answer);
                response.then(res=>{
                    getStrategyQuestion()
                })
            }else{
                const response = new AnketaService().saveForm(id,questionsData.answer,1,user_id);
                response.then(res=>{
                    getStrategyQuestion()
                })
            }
        }
    };

    const inputHandleChanged = (e) => {
        if (questionsData.type == 1){
            dispatch({
                type: SET_INPUT_ANKETA_VALUE,
                payload: {
                    value: e.target.value,
                    index: index,
                    questionNumber:questionNumber
                }
            });
            dispatch({
                type: CHECK_COMPLETED_ANSWERS,
                payload: allData
            })
        }
    };

    useEffect(()=>{
        let a = false;
        if (questionsData.answer){
            if (questionsData.answer.commentary){
                if (questionsData.answer.commentary.read == 0){
                    setError(true);
                    a = true;
                }
            }
        }
        if (!a){
            setError(false);
            console.log("checked")
        }
    },[questionsData]);

    return(
        <div style={{flex:1}} className={styles.root}>
                {/*{title && (*/}
                {/*    <div className={styles.title}>*/}
                {/*        {title}*/}
                {/*    </div>*/}
                {/*)}*/}
            <div className={styles.head}>
                <div className={styles.text}>
                    {text}
                </div>
                <div className={styles.warning}>
                    {error && (
                        <div className={styles.warning}>
                            <img
                                onClick={() => {
                                    // if (commentInfo) {
                                    //     if (commentInfo.answer_id == questionsData.answer.commentary.answer_id) {
                                    setOpen(true);
                                    //         setInfo(null)
                                    //     } else {
                                    setInfo(questionsData.answer.commentary);
                                    //     }
                                    // } else {
                                    //     setOpen(!commentOpen);
                                    //     setInfo(questionsData.answer.commentary);
                                    // }
                                }}
                                className={styles.comment}
                                src={Comment} alt=""/>
                        </div>
                    )}
                </div>
            </div>
            {questionsData && (
                <div className={styles.input}>
                    {questionsData.input == "textarea" && (
                        <div className={styles.textarea}>
                            <textarea
                                className={error ?  `${styles.textField} warning` : ( focus || (questionsData.answer && questionsData.answer.answers && questionsData.answer.answers['1']) ? `on` : `off`)}
                                disabled={(userData.roles[0].name === "client" && (questionsData ? (questionsData.answer ? (questionsData.answer.disabled == 1 ) : false) : false)) || (userData.roles[0].name === "editor" || userData.roles[0].name === "marketer" || userData.roles[0].name === "financier" || userData.roles[0].name==="lawyer")}
                                name=""
                                placeholder={placeholder}
                                id=""
                                cols="4"
                                rows="4"
                                onChange={(e)=>inputHandleChanged(e)}
                                value={(questionsData.answer && questionsData.answer.answers) ? questionsData.answer.answers['1'] : ""}
                            >
                            </textarea>
                        </div>
                    )}
                    {(questionsData.input == "phone") && (
                        <TextField
                            autoComplete={"off"}
                            className={error ?  `${styles.textField} warning` : ( focus || (questionsData.answer && questionsData.answer.answers && questionsData.answer.answers['1']) ? `${styles.textField} on` : `${styles.textField} off`)}
                            id="outlined-basic"
                            placeholder={placeholder}
                            name="number"
                            type="text"
                            variant="outlined"
                            key={questionsData.key}
                            disabled={userData.roles[0].name === "client" && (questionsData ? (questionsData.answer ? (questionsData.answer.disabled == 1 ) : false) : false) || (userData.roles[0].name === "editor" || userData.roles[0].name === "marketer" || userData.roles[0].name === "financier" || userData.roles[0].name==="lawyer")}
                            style={error ? {borderColor:'#FF991F'} : {}}
                            value={(questionsData.answer && questionsData.answer.answers) ? questionsData.answer.answers['1'] : ""}
                            onFocus={()=>{
                                setFocus(true);
                            }}
                            onBlur={()=>{
                                setFocus('');
                                // sendAnswer();
                            }}
                            onChange={(e)=>{
                                console.log(e)
                                console.log(e.target.value);
                                if (!isNaN(e.target.value) || e.target.value=="+" || e.target.value==""){
                                    if (e.target.value === "+"){
                                        e.target.value = "";
                                        inputHandleChanged(e)
                                    }
                                    else if (e.target.value[0]!=="+"){
                                        e.target.value='+'+e.target.value;
                                        inputHandleChanged(e);
                                    }else{
                                        inputHandleChanged(e);
                                    }
                                }
                                // console.log(e.target.value);
                                // if (questionsData.answer && questionsData.answer.answers  && questionsData.answer.answers['1'].length == 0 && e.target.value[0] !== "+"){
                                //     e.target.value = "+"+e.target.value
                                // }
                                // if (!isNaN(e.target.value.slice(1,e.target.value.length))){
                                //     inputHandleChanged(e);
                                // }
                            }}
                            InputProps={{
                                autoComplete: "nope",
                                endAdornment: (
                                    <InputAdornment position="end">
                                        {error && (
                                            <img
                                                onClick={()=>{
                                                    // if (commentInfo){
                                                    //     console.log(commentInfo)
                                                    //     if (commentInfo.answer_id == questionsData.answer.commentary.answer_id){
                                                            setOpen(true);
                                                    //         // setInfo(null)
                                                    //     }else{
                                                            setInfo(questionsData.answer.commentary);
                                                    //     }
                                                    // }else{
                                                    //     setOpen(!commentOpen);
                                                    //     setInfo(questionsData.answer.commentary);
                                                    // }
                                                }}
                                                className={styles.comment}
                                                src={Comment} alt=""/>
                                        )}
                                    </InputAdornment>
                                ),
                            }}
                        />
                    )}
                    {questionsData.input == 'number' && (
                        <TextField
                            autoComplete={"off"}
                            className={error ?  `${styles.textField} warning` : ( focus || (questionsData.answer && questionsData.answer.answers && questionsData.answer.answers['1'])  ? `${styles.textField} on` : `${styles.textField} off`)}
                            id="outlined-basic"
                            placeholder={placeholder}
                            name="number"
                            type="text"
                            min="0"
                            inputmode="numeric"
                            pattern="[0-9]*"
                            title="Non-negative integral number"
                            variant="outlined"
                            key={questionsData.key}
                            disabled={userData.roles[0].name === "client" && (questionsData ? (questionsData.answer ? (questionsData.answer.disabled == 1 ) : false) : false) || (userData.roles[0].name === "editor" || userData.roles[0].name === "marketer" || userData.roles[0].name === "financier" || userData.roles[0].name==="lawyer")}
                            style={error ? {borderColor:'#FF991F'} : {}}
                            value={(questionsData.answer && questionsData.answer.answers) ? questionsData.answer.answers['1'] : ""}
                            onFocus={()=>{
                                setFocus(true);
                            }}
                            onBlur={()=>{
                                setFocus('');
                                // sendAnswer();
                            }}
                            onChange={(e)=>{
                                console.log(e.target.value)
                                console.log(!isNaN(e.target.value));
                                if (!isNaN(e.target.value)){
                                    console.log(e.target.value);
                                    inputHandleChanged(e);
                                }
                            }}
                            InputProps={{
                                autoComplete: "nope",
                                endAdornment: (
                                    <InputAdornment position="end">
                                        {error && (
                                            <img
                                                onClick={()=>{
                                                    // if (commentInfo){
                                                    //     console.log(commentInfo)
                                                    //     if (commentInfo.answer_id == questionsData.answer.commentary.answer_id){
                                                    setOpen(true);
                                                    //         // setInfo(null)
                                                    //     }else{
                                                    setInfo(questionsData.answer.commentary);
                                                    //     }
                                                    // }else{
                                                    //     setOpen(!commentOpen);
                                                    //     setInfo(questionsData.answer.commentary);
                                                    // }
                                                }}
                                                className={styles.comment}
                                                src={Comment} alt=""/>
                                        )}
                                    </InputAdornment>
                                ),
                            }}
                        />
                    )}
                    {questionsData.input == null && (
                        <TextField
                            autoComplete={"off"}
                            className={error ?  `${styles.textField} warning` : ( focus || (questionsData.answer && questionsData.answer.answers && questionsData.answer.answers['1']) ? `${styles.textField} on` : `${styles.textField} off`)}
                            id="outlined-basic"
                            placeholder={placeholder}
                            name="text"
                            variant="outlined"
                            key={questionsData.key}
                            disabled={userData.roles[0].name === "client" && (questionsData ? (questionsData.answer ? (questionsData.answer.disabled == 1 ) : false) : false) || (userData.roles[0].name === "editor" || userData.roles[0].name === "marketer" || userData.roles[0].name === "financier" || userData.roles[0].name==="lawyer")}
                            style={error ? {borderColor:'#FF991F'} : {}}
                            value={(questionsData.answer && questionsData.answer.answers) ? questionsData.answer.answers['1'] : ""}
                            onFocus={()=>{
                                setFocus(true);
                            }}
                            onBlur={()=>{
                                setFocus('');
                            }}
                            onChange={(e)=>{
                                inputHandleChanged(e);
                            }}
                            InputProps={{
                                autoComplete: "nope",
                                endAdornment: (
                                    <InputAdornment position="end">
                                        {error && (
                                            <img
                                                onClick={()=>{
                                                    // if (commentInfo){
                                                    // if (commentInfo.answer_id == questionsData.answer.commentary.answer_id){
                                                    setOpen(true);
                                                    // setInfo(null);
                                                    // if (!commentOpen === true){
                                                    //     console.log(!commentInfo);
                                                        setInfo(questionsData.answer.commentary);
                                                    // }else setInfo(null)
                                                    // }else{
                                                    // }
                                                    // }else{
                                                    //     setOpen(!commentOpen);
                                                    //     setInfo(questionsData.answer.commentary);
                                                    // }
                                                }}
                                                className={styles.comment}
                                                src={Comment} alt=""/>
                                        )}
                                    </InputAdornment>
                                ),
                            }}
                        />
                    )}
                    {questionsData.input === "email" && (
                        <TextField
                            autoComplete={"off"}
                            className={error ?  `${styles.textField} warning` : ( focus || (questionsData.answer && questionsData.answer.answers && questionsData.answer.answers['1']) ? `${styles.textField} on` : `${styles.textField} off`)}
                            id="outlined-basic"
                            placeholder={placeholder}
                            name="email"
                            variant="outlined"
                            key={questionsData.key}
                            disabled={(userData.roles[0].name === "client" && (questionsData ? (questionsData.answer ? (questionsData.answer.disabled == 1 ) : false) : false)) || (userData.roles[0].name === "editor" || userData.roles[0].name === "marketer" || userData.roles[0].name === "financier" || userData.roles[0].name==="lawyer")}
                            style={error ? {borderColor:'#FF991F'} : {}}
                            value={(questionsData.answer && questionsData.answer.answers) ? questionsData.answer.answers['1'] : ""}
                            onFocus={()=>{
                                setFocus(true);
                            }}
                            onBlur={()=>{
                                setFocus('');
                            }}
                            onChange={(e)=>{
                                inputHandleChanged(e);
                            }}
                            error={(questionsData.answer && questionsData.answer.answers) ? !validateEmail(questionsData.answer.answers['1']) : false}
                            helperText={(questionsData.answer && questionsData.answer.answers)? (!validateEmail(questionsData.answer.answers['1']) ? "Неправильный формат email" : "") : ""}
                            InputProps={{
                                autoComplete: "nope",
                                endAdornment: (
                                    <InputAdornment position="end">
                                        {error && (
                                            <img
                                                onClick={()=>{
                                                    // if (commentInfo){
                                                        // if (commentInfo.answer_id == questionsData.answer.commentary.answer_id){
                                                            setOpen(true);
                                                            // setInfo(null);
                                                        // if (!commentOpen === true){
                                                        //     console.log(!commentInfo);
                                                            setInfo(questionsData.answer.commentary);
                                                        // }else setInfo(null)
                                                        // }else{
                                                        // }
                                                    // }else{
                                                    //     setOpen(!commentOpen);
                                                    //     setInfo(questionsData.answer.commentary);
                                                    // }
                                                }}
                                                className={styles.comment}
                                                src={Comment} alt=""/>
                                        )}
                                    </InputAdornment>
                                ),
                            }}
                        />
                    )}
                </div>
            )}
            {userData.roles[0].name === "client" && (
                <>
                    {answer ? (
                        <>
                            {(answer.commentary && commentInfo) ? (
                                <>
                                    {commentInfo.answer_id == answer.id ? (
                                        <div
                                            style={commentOpen ? {display: 'block'} : {display: 'none'}}
                                            className={styles.commentModal}>
                                            <div className={styles.commentContainer}>
                                                <div className={styles.comment}>
                                                    <div className={styles.commentHeader}>
                                                        <div className={styles.userLogo}>
                                                            <img
                                                                src="data:image/jpeg;base64,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"
                                                                alt="userLogo"/>
                                                        </div>
                                                        <div className={styles.userName}>
                                                            <div
                                                                className={styles.name}>{commentInfo.user.roles[0].name}</div>
                                                            <div
                                                                className={styles.date}>{returnDateFormat(commentInfo.created_at)}</div>
                                                        </div>
                                                        <div onClick={() => setOpen(false)}
                                                             className={styles.close}>
                                                        </div>
                                                    </div>
                                                    <div className={styles.commentText}>
                                                        {commentInfo.text}
                                                    </div>
                                                    {commentInfo.read == 0 ? (
                                                        <div onClick={readIt}
                                                             className={styles.okBtn}>
                                                            Принято
                                                        </div>
                                                    ) : (
                                                        <div className={styles.readedBtn}>
                                                            Исправлено
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className={styles.emptyModal}>
                                        </div>
                                    )}
                                </>
                            ) : (
                                <div className={styles.emptyModal}>
                                </div>
                            )}
                        </>
                    ) : (
                        <div className={styles.emptyModal}>
                        </div>
                    )}
                </>
            )}
        </div>
    )
};

QuestionTextFieldInput.propTypes = {
    title: PropTypes.string,
    text: PropTypes.string,
    require: PropTypes.bool
};



export default QuestionTextFieldInput;