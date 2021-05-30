import React, {useState} from "react";
import styles from "../../assets/styles/AdminStyles/ContentInfoEditModal.module.scss"
import TextField from "@material-ui/core/TextField/TextField";
import {useDispatch} from "react-redux";
import {updateFormAction} from "../../redux/actions/settings/updateFormAction";
import CircularIndeterminate from "../../components/FormConponents/ProgressCircle";


const ContentFormUpdateModal = ({form,close,setForm,reget,type}) => {
    console.log(form);
    const dispatch = useDispatch();
    const [isPending,setPending] = useState(false);

    const changeFormTitle = event => {
        const copy = {...form};
        copy.title = event.target.value;
        setForm(copy);
    };

    const changeFormPlaceholder = event => {
        const copy = {...form};
        copy.placeholder = event.target.value;
        setForm(copy);
    };

    const changeFormAnswer = (event,keyName) => {
        const copy = {...form};
        copy.answers = {...form.answers};
        copy.answers[keyName] = event.target.value;
        setForm(copy);
    };


    const changeFormDescription  = event => {
        const copy = {...form};
        copy.description = event.target.value;
        setForm(copy);
    };

    const changeFormExample = event => {
        const copy = {...form};
        copy.example = event.target.value;
        setForm(copy);
    };

    const submit = () => {
        setPending(true);
        let body;
        if (type === 'question'){
            body = {
                type: "form",
                id: form.id,
                title: form.title,
                placeholder: form.placeholder,
                key: form.key,
                answers: form.answers
            };
        }else if (type === 'title'){
            body = {
                type: "question",
                id: form.id,
                title: form.title,
                description: form.description,
                example: form.example
            };
        }
        const response = dispatch(updateFormAction(body));
        response.then(()=>{
            setPending(false);
            reget();
            close();
        }).catch(err=>{
            setPending(false);
        })
    };

    return(
        <div className={styles.modal}>
            {isPending ? (
                <CircularIndeterminate/>
            ):(
                <>
                    {type === 'question' && (
                        <>
                            <TextField
                                autoComplete={"off"}
                                className={form.title ? `${styles.textField} on` : `${styles.textField} off`}
                                id="outlined-basic"
                                // placeholder={placeholder}
                                name="name"
                                label={"Вопрос"}
                                type="text"
                                variant="outlined"
                                value={form.title}
                                onChange={changeFormTitle}
                                style={{marginBottom:15}}
                                // key={questionsData.key}
                                // disabled={userData.roles[0].name === "client" && (questionsData ? (questionsData.answer ? (questionsData.answer.disabled == 1 ) : false) : false) || (userData.roles[0].name === "editor" || userData.roles[0].name === "marketer" || userData.roles[0].name === "financier" || userData.roles[0].name==="lawyer")}
                                // style={error ? {borderColor:'#FF991F'} : {}}
                            />
                            <TextField
                                autoComplete={"off"}
                                className={form.placeholder ? `${styles.textField} on` : `${styles.textField} off`}
                                id="outlined-basic"
                                // placeholder={placeholder}
                                name="name"
                                label={"Placeholder"}
                                type="text"
                                variant="outlined"
                                value={form.placeholder}
                                onChange={changeFormPlaceholder}
                                // key={questionsData.key}
                                // disabled={userData.roles[0].name === "client" && (questionsData ? (questionsData.answer ? (questionsData.answer.disabled == 1 ) : false) : false) || (userData.roles[0].name === "editor" || userData.roles[0].name === "marketer" || userData.roles[0].name === "financier" || userData.roles[0].name==="lawyer")}
                                // style={error ? {borderColor:'#FF991F'} : {}}
                            />
                            {form.answers && (
                                <div className={styles.answers}>
                                    <div className={styles.title}>Варианты ответов</div>
                                    {Object.keys(form.answers).map((keyName,i)=>(
                                        <TextField
                                            autoComplete={"off"}
                                            disabled={form.answers[keyName] === "Другое:"}
                                            className={form.answers[keyName] ? `${styles.textField} on` : `${styles.textField} off`}
                                            id="outlined-basic"
                                            // placeholder={placeholder}
                                            name="name"
                                            label={keyName}
                                            type="text"
                                            variant="outlined"
                                            value={form.answers[keyName]}
                                            onChange={(e)=>changeFormAnswer(e,keyName)}
                                            style={{marginBottom:15}}
                                            key={i}
                                            // disabled={userData.roles[0].name === "client" && (questionsData ? (questionsData.answer ? (questionsData.answer.disabled == 1 ) : false) : false) || (userData.roles[0].name === "editor" || userData.roles[0].name === "marketer" || userData.roles[0].name === "financier" || userData.roles[0].name==="lawyer")}
                                            // style={error ? {borderColor:'#FF991F'} : {}}
                                        />
                                    ))}
                                </div>
                            )}
                        </>
                    )}
                    {type === 'title' && (
                        <>
                            <div className={styles.textarea}>
                            <textarea
                                className={form.description ? `${styles.textField} on` : `${styles.textField} off`}
                                name=""
                                placeholder={"Введите описание"}
                                id=""
                                cols="4"
                                rows="4"
                                onChange={changeFormDescription}
                                value={form.description}
                                style={{marginBottom:15}}
                            >
                            </textarea>
                            </div>
                            <div className={styles.textarea}>
                            <textarea
                                className={form.example ? `${styles.textField} on` : `${styles.textField} off`}
                                name=""
                                placeholder={"Введите пример"}
                                id=""
                                cols="4"
                                rows="4"
                                onChange={changeFormExample}
                                value={form.example}
                                style={{marginBottom:15}}
                            >
                            </textarea>
                            </div>
                        </>
                    )}
                    <div className={styles.action}>
                        <button onClick={submit} className={styles.btn}>
                            Сохранить
                        </button>
                        <button onClick={close} style={{backgroundColor:"#ccc",color:"#171717"}} className={styles.btn}>
                            Отмена
                        </button>
                    </div>
                </>
            )}
        </div>
    )
};

export default ContentFormUpdateModal;