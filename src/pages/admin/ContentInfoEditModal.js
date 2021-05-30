import React from "react";
import styles from "../../assets/styles/AdminStyles/ContentInfoEditModal.module.scss"
import InputAdornment from "@material-ui/core/InputAdornment";
import Comment from "../../assets/icons/comment.svg";
import TextField from "@material-ui/core/TextField/TextField";
import {useDispatch} from "react-redux";
import {CHANGE_DESCRIPTION, CHANGE_LINK, CHANGE_NAME} from "../../types/AdminTypes";
import {updateAnketaAction} from "../../redux/actions/settings/updateAnketaAction";

const ContentInfoEditModal = ({data,closeInfoEditor}) => {

    const dispatch = useDispatch();

    const changeName = event => {
        console.log(event.target.value);
        dispatch({
            type: CHANGE_NAME,
            payload: event.target.value
        });
    };

    const changeDescription = event => {
        dispatch({
            type: CHANGE_DESCRIPTION,
            payload: event.target.value
        });
    };

    const changeLink = event => {
        dispatch({
            type: CHANGE_LINK,
            payload: event.target.value
        });
    };

    const submit = () => {
        const body = {
            type: "section",
            id: data.id,
            name: data.name,
            description: data.description,
            link: data.link
        };
        dispatch(updateAnketaAction(body));
        closeInfoEditor()
    };

    return(
        <div className={styles.modal}>
            <TextField
                autoComplete={"off"}
                className={data.name ? `${styles.textField} on` : `${styles.textField} off`}
                id="outlined-basic"
                // placeholder={placeholder}
                name="name"
                label={"Название раздела"}
                type="text"
                variant="outlined"
                value={data.name}
                onChange={changeName}
                // key={questionsData.key}
                // disabled={userData.roles[0].name === "client" && (questionsData ? (questionsData.answer ? (questionsData.answer.disabled == 1 ) : false) : false) || (userData.roles[0].name === "editor" || userData.roles[0].name === "marketer" || userData.roles[0].name === "financier" || userData.roles[0].name==="lawyer")}
                // style={error ? {borderColor:'#FF991F'} : {}}
            />
            <div className={styles.textarea}>
                            <textarea
                                className={styles.textField}
                                name=""
                                onChange={changeDescription}
                                // placeholder={placeholder}
                                id=""
                                cols="4"
                                rows="4"
                                value={data.description}
                            >
                            </textarea>
            </div>
            <TextField
                autoComplete={"off"}
                style={{marginTop:'15px'}}
                className={data.link ? `${styles.textField} on` : `${styles.textField} off`}
                id="outlined-basic"
                // placeholder={placeholder}
                onChange={changeLink}
                name="link"
                type="text"
                variant="outlined"
                value={data.link}
                label={"Ссылка"}
                // key={questionsData.key}
                // disabled={userData.roles[0].name === "client" && (questionsData ? (questionsData.answer ? (questionsData.answer.disabled == 1 ) : false) : false) || (userData.roles[0].name === "editor" || userData.roles[0].name === "marketer" || userData.roles[0].name === "financier" || userData.roles[0].name==="lawyer")}
                // style={error ? {borderColor:'#FF991F'} : {}}
            />
            <div className={styles.action}>
                <button onClick={submit} className={styles.btn}>
                Сохранить
            </button>
                <button onClick={closeInfoEditor} style={{backgroundColor:"#ccc",color:"#171717"}} className={styles.btn}>
                    Отмена
                </button>
            </div>
        </div>
    )
};

export default ContentInfoEditModal;