import React, {useEffect, useState} from "react";
import styles from "../../assets/styles/FormStyles/ApplicationFormPage.module.scss";
import GoBack from "../OtherComponents/GoBack";
import SaveBtn from "../OtherComponents/SaveBtn";
import FormProgress from "./FormProgress";
import QuestionTextFieldInput from "./QuestionTextFieldInput";
import PaginationComponent from "../OtherComponents/PaginationComponent";
import MainService from "../../services/MainService";
import QuestionFileInput from "./QuestionFileInput";
import QuestionCheckboxInput from "./QuestionCheckboxInput";
import {returnDateFormat} from "../../tools/returnDateFormat";
import AnketaService from "../../services/AnketaService";
import QuestionRadioInput from "./QuestionRadioInput";
import {useDispatch, useSelector} from "react-redux";
import {useParams,useHistory,useLocation} from "react-router-dom";
import lep from "../../assets/icons/lep.svg";
import TextField from "@material-ui/core/TextField/TextField";
import trashIcon from "../../assets/icons/trashIcon.svg"
import Modal from "react-modal";
import ChangeStatusModal from "../../pages/admin/ChangeStatusModal";
import {CREATE_ANKETA_FORM, DELETE_COMMENT} from "../../types/anketaTypes";
import {saveAnketaValueAction} from "../../redux/actions/anketa/saveAnketaValueAction";
import ErrorPopupModal from "../OtherComponents/ErrorPopupModal";
import Faq from "../FaqComponents/Faq";
import getMediaUrls from "../../tools/getMediaUrls";
import NotificationSystemIcon from "../../assets/icons/notificsystem.svg";

const customStyles = {
    content : {
        top                   : '50%',
        left                  : '50%',
        right                 : 'auto',
        bottom                : 'auto',
        marginRight           : '-50%',
        transform             : 'translate(-50%, -50%)',
        borderRadius          : '32px',
        padding               : 0
    }
};

const StrategyForm = () => {
    const history = useHistory();
    const location = useLocation();
    const {id} = useParams();
    const dispatch = useDispatch();
    const {userData} = useSelector(state => state.AuthPage);
    const [questionNumber, setQuestionNumber] = useState(0);
    const {questionsData,completed} = useSelector(state => state.AnketaPage);
    const [commentOpen, setOpen] = useState(false);
    const [commentInfo, setInfo] = useState(null);
    const [popUpText,setPopUpText] = useState(null);
    const search = new URLSearchParams(useLocation().search);

    const handleChangeQuestion = (event, newPage) => {
        window.scroll({top: 0, left: 0, behavior: 'smooth'});
        setQuestionNumber(newPage - 1);
        history.replace(`?page=${newPage}`)
    };

    const getStrategyQuestion = () => {
        if (userData.roles[0].name === "client") {
            const response = new MainService().getQuestions('strategy');
            response.then(res => {
                dispatch({
                    type: CREATE_ANKETA_FORM,
                    payload: res.data
                });
            });
            response.catch(err => {
            })
        }else{
            const response = new MainService().getQuestions('strategy',id);
            response.then(res => {
                dispatch({
                    type: CREATE_ANKETA_FORM,
                    payload: res.data
                });
            });
            response.catch(err => {
            })
        }
    };


    useEffect(() => {
        document.title = "Стратегический раздел"

        if (userData.roles[0].name === "client"){
            const response = new MainService().getQuestions('strategy');
            response.then(res => {
                dispatch({
                    type: CREATE_ANKETA_FORM,
                    payload: res.data
                });
            });
            response.catch(err => {
                console.log(err)
            })
        }else{
            const response = new MainService().getQuestions('strategy',id);
            response.then(res => {
                dispatch({
                    type: CREATE_ANKETA_FORM,
                    payload: res.data
                });
            });
            response.catch(err => {
            })
        }
    }, []);

    const readIt = () => {
        const response = new AnketaService().commentReadIt(commentInfo.id);
        response.then(res => {
            setInfo(null);
            setOpen(false);
            dispatch({
                type: DELETE_COMMENT,
                payload:{
                    questionNumber:questionNumber,
                    comment_id: commentInfo.id
                }
            });
        }).catch(err => {
            console.log(err);
        });
    };

    const [newCommentInfo,setNewCommentInfo] = useState('');
    const [modalId,setModal] = useState('');

    const handleNewComment = (info,index) => {
        setModal(index);
    };

    const [changeStatusModal,setChangeStatusModal] = useState(false);
    const [successSavedModal,setSuccessSavedModal] = useState(false);

    const closeStatusModal = () => {
        setChangeStatusModal(false);
    };

    const save = (pagination=false) => {
        setModal('');
        if (userData.roles[0].name === "client"){
            dispatch(saveAnketaValueAction(userData.id,questionsData,'strategy'));
        }else{
                const response = dispatch(saveAnketaValueAction(localStorage.getItem('user_id'),questionsData,'strategy'));
                response.then(res=>{
                    if (!pagination) {
                        setPopUpText("Анкета успешно сохранена!")
                        openSuccessSaved();
                    }
                })

            // dispatch(saveAnketaValueAction(id,questionsData,'strategy'));
        }
    };

    const saveAnketa = (type=null) => {
        save();
        if (userData.roles[0].name === 'client'){
            const response = new AnketaService().savedAnketa('strategy');
            response.then(res=>{
                if (type === null){
                    setPopUpText("Анкета успешно сохранена!")
                }else{
                    setPopUpText("Файл успешно добавлен!")
                }
                openSuccessSaved();
            })
        }
    };

    useEffect(()=>{
        if (search.get('page')){
            setQuestionNumber(parseInt(search.get('page')-1));
        }
    },[]);

    const openSuccessSaved = () => {
        setSuccessSavedModal(true);
    };

    const closeSuccessSaved = () => {
        setSuccessSavedModal(false)
    };

    return (
        <>
            <Modal
                isOpen={changeStatusModal}
                onRequestClose={closeStatusModal}
                style={customStyles}
                contentLabel=""
            >
                <ChangeStatusModal section={"strategy"} closeStatusModal={closeStatusModal}/>
            </Modal>
            <Modal
                isOpen={successSavedModal}
                onRequestClose={closeStatusModal}
                style={customStyles}
                contentLabel=""
            >
                <ErrorPopupModal
                    data={{type:"success",title:"Отлично",text:popUpText}}
                    closePopupHandleChange={closeSuccessSaved}
                />
            </Modal>
            <div className={styles.container_header}>
                <GoBack title={"Стратегический раздел"} subtitle={questionsData ? `${questionsData.length} вопросов` : "0 вопросов"}/>
                <div className={styles.save_btns}>
                    {!location.pathname.includes('/questionnaire') && (
                        <SaveBtn
                            save={saveAnketa}
                            // disabled={isSave}
                            title={"Сохранить"}
                        />
                    )}
                    {location.pathname.includes('/admin/questionnaire/strategy/') ? (
                        <>
                            {(userData.roles[0].name !== "client" && userData.roles[0].name !=="moderator") && (
                                <SaveBtn
                                    save={()=>setChangeStatusModal(true)}
                                    // disabled={isSave}
                                    title={"Изменить статус"}
                                />
                            )}
                        </>
                    ):(
                        <>
                            {(userData.roles[0].name !== "client") && (
                                <SaveBtn
                                    save={()=>setChangeStatusModal(true)}
                                    // disabled={isSave}
                                    title={"Изменить статус"}
                                />
                            )}
                        </>
                    )}
                </div>
            </div>
            <div className={styles.container}>
                <div className={styles.mini_container}>
                    <div className={styles.form_body}>
                        <div style={{display: 'flex'}}>
                            <div style={{flex: 1,width:'100%'}}>
                                <FormProgress completed={completed}/>
                            </div>
                            <div className={styles.emptyModal}>
                            </div>
                        </div>
                        {questionsData && (
                            <>
                                <div>
                                    {questionsData[questionNumber].title && (
                                        <div style={{display: 'flex'}}>
                                            <div className={styles.title_container}>
                                                {/*<div*/}
                                                {/*    className={styles.progress}>{`ВОПРОСЫ ${questionNumber + 1} из ${questionsData.length}`}</div>*/}
                                                <div
                                                    className={styles.title}>{questionsData[questionNumber].title}</div>
                                                <div
                                                    className={styles.description}>{questionsData[questionNumber].description}</div>
                                            </div>
                                            <div className={styles.emptyModal}>
                                            </div>
                                        </div>
                                    )}
                                    {questionsData[questionNumber].example && (
                                        <div style={{display:'flex'}}>
                                            <div className={styles.example_container}>
                                                <div className={styles.example_title}>НАПРИМЕР</div>
                                                <div className={styles.example}
                                                     dangerouslySetInnerHTML={{__html: questionsData[questionNumber].example}}></div>
                                            </div>
                                            <div className={styles.emptyModal}>
                                            </div>
                                        </div>
                                    )}
                                    {questionsData[questionNumber].forms.map((el, index) => (
                                        <div className={styles.question}>
                                            {el.type == 1 && (
                                                <div key={el.key} className={styles.quest}>
                                                    {el.title.length !== 0 && (
                                                        <QuestionTextFieldInput
                                                            questionNumber={questionNumber}
                                                            index={index}
                                                            user_id={id}
                                                            getStrategyQuestion={getStrategyQuestion}
                                                            id={el.id}
                                                            key={el.key}
                                                            allData={questionsData}
                                                            questionsData={questionsData[questionNumber].forms[index]}
                                                            placeholder={el.placeholder}
                                                            title={!questionsData[questionNumber].title && `Вопросы ${questionNumber + 1} из ${questionsData.length}`}
                                                            text={el.title}
                                                            commentOpen={commentOpen}
                                                            setOpen={setOpen}
                                                            setInfo={setInfo}
                                                            commentInfo={commentInfo}
                                                            answer={el.answer}
                                                            readIt={readIt}
                                                        />
                                                    )}
                                                </div>
                                            )}
                                            {el.type == 2 && (
                                                <div className={styles.quest}>
                                                    <QuestionRadioInput
                                                        allData={questionsData}
                                                        questionNumber={questionNumber}
                                                        index={index}
                                                        user_id={id}
                                                        questionsData={questionsData[questionNumber].forms[index]}
                                                        id={el.id}
                                                        key={el.key}
                                                        placeholder={el.placeholder}
                                                        title={!questionsData[questionNumber].title && `Вопросы ${questionNumber + 1} из ${questionsData.length}`}
                                                        text={el.title}
                                                        commentOpen={commentOpen}
                                                        setOpen={setOpen}
                                                        setInfo={setInfo}
                                                        commentInfo={commentInfo}
                                                        getStrategyQuestion={getStrategyQuestion}
                                                        answer={el.answer}
                                                        readIt={readIt}
                                                    />
                                                </div>
                                            )}
                                            {el.type == 3 && (
                                                <div key={el.key} className={styles.quest}>
                                                    <QuestionFileInput
                                                        section={"strategy"}
                                                        allData={questionsData}
                                                        questionNumber={questionNumber}
                                                        index={index}
                                                        user_id={id}
                                                        getStrategyQuestion={getStrategyQuestion}
                                                        questionsData={questionsData[questionNumber].forms[index]}
                                                        id={el.id}
                                                        key={el.key}
                                                        placeholder={el.placeholder}
                                                        // title={!questionsData[questionNumber].title && `Вопросы ${questionNumber + 1} из ${questionsData.length}`}
                                                        text={el.title}
                                                        commentOpen={commentOpen}
                                                        setOpen={setOpen}
                                                        setInfo={setInfo}
                                                        commentInfo={commentInfo}
                                                        answer={el.answer}
                                                        readIt={readIt}
                                                        saveAnketa={saveAnketa}
                                                    />
                                                </div>
                                            )}
                                            {el.type == 4 && (
                                                <div key={el.key} className={styles.quest}>
                                                    <QuestionCheckboxInput
                                                        allData={questionsData}
                                                        questionNumber={questionNumber}
                                                        index={index}
                                                        user_id={id}
                                                        id={el.id}
                                                        questionsData={questionsData[questionNumber].forms[index]}
                                                        key={el.key}
                                                        placeholder={el.placeholder}
                                                        title={!questionsData[questionNumber].title && `Вопросы ${questionNumber + 1} из ${questionsData.length}`}
                                                        text={el.title}
                                                        commentOpen={commentOpen}
                                                        setOpen={setOpen}
                                                        setInfo={setInfo}
                                                        commentInfo={commentInfo}
                                                        getStrategyQuestion={getStrategyQuestion}
                                                        answer={el.answer}
                                                        readIt={readIt}
                                                    />
                                                </div>
                                            )}
                                            {userData.roles[0].name === "client" ? (
                                                <>
                                                    {el.answer ? (
                                                        <>
                                                            {(el.answer.commentary && commentInfo) ? (
                                                                <>
                                                                    {commentInfo.answer_id == el.answer.id ? (
                                                                        <div
                                                                            style={commentOpen ? {display: 'block'} : {visibility: 'hidden'}}
                                                                            className={styles.commentModal}>
                                                                            <div className={styles.commentContainer}>
                                                                                <div className={styles.comment}>
                                                                                    <div className={styles.commentHeader}>
                                                                                        <div className={styles.userLogo}>
                                                                                            <img
                                                                                                src={(commentInfo && commentInfo.user && commentInfo.user.avatar) ? getMediaUrls(commentInfo.user.avatar) : NotificationSystemIcon}
                                                                                                alt={commentInfo.logo}/>
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
                                            ):(
                                                <>
                                                {(userData && ((userData.roles[0].name === "admin" || userData.roles[0].name === "moderator") && !location.pathname.includes("questionnaire"))) ? (
                                                <>
                                                    {modalId === index ? (
                                                        <div className={styles.new_comment2}>
                                                            <div className={styles.head}>
                                                                <div onClick={()=>{
                                                                    setModal('')
                                                                    setNewCommentInfo('')
                                                                }} className={styles.close}>

                                                                </div>
                                                            </div>
                                                            <TextField
                                                                className={`${styles.textField} on`}
                                                                id="outlined-basic"
                                                                variant="outlined"
                                                                key={index}
                                                                value={newCommentInfo}
                                                                onChange={(e)=>{
                                                                    setNewCommentInfo(e.target.value);
                                                                }}
                                                            />
                                                            <div onClick={()=>{
                                                                const response = new AnketaService().setComment(el.answer.id,newCommentInfo,"strategy");
                                                                response.then(res=>{
                                                                    setNewCommentInfo('');
                                                                    setModal('');
                                                                    getStrategyQuestion();
                                                                }).catch(err=>{
                                                                    console.log(err);
                                                                })
                                                            }}
                                                                 className={styles.btn}>
                                                                Отправить
                                                            </div>
                                                        </div>
                                                    ):(
                                                        <>
                                                            {(el.answer && el.answer.commentary) ? (
                                                                <div className={styles.comment2}>
                                                                    <div className={styles.commentHeader}>
                                                                        <div className={styles.userLogo}>
                                                                            <img
                                                                                src={(commentInfo && commentInfo.user && commentInfo.user.avatar) ? getMediaUrls(commentInfo.user.avatar) : NotificationSystemIcon}
                                                                                alt="userLogo"/>
                                                                        </div>
                                                                        <img onClick={()=>{
                                                                            const response = new AnketaService().deleteCommentary(el.answer.commentary.id);
                                                                            response.then(res=>{
                                                                                console.log(res);
                                                                                getStrategyQuestion();
                                                                            }).catch(err=>{
                                                                                console.log(err);
                                                                            })
                                                                        }} src={trashIcon} className={styles.trash} alt=""/>
                                                                        <div className={styles.userName}>
                                                                            <div
                                                                                className={styles.name}>{el.answer.commentary.user.roles[0].name}</div>
                                                                            <div
                                                                                className={styles.date}>{returnDateFormat(el.answer.commentary.created_at)}</div>
                                                                        </div>
                                                                    </div>
                                                                    <div
                                                                        style={el.answer.commentary.read == 1 ? {color:'#00875A'}: {}}
                                                                        className={styles.commentText}>
                                                                        {el.answer.commentary.text}
                                                                    </div>
                                                                </div>
                                                            ):((el.answer ? (
                                                                    <div onClick={handleNewComment.bind(this,el,index)} className={styles.new_comment}>
                                                                        <div className={styles.img}><img src={lep} alt="comment"/></div>
                                                                        <div className={styles.text}>
                                                                            Отправить на исправление
                                                                        </div>
                                                                    </div>
                                                                ):(
                                                                    <div className={`${styles.new_comment} ${styles.disable}`}>
                                                                        <div className={styles.img}><img src={lep} alt="comment"/></div>
                                                                        <div className={styles.text}>
                                                                            Отправить на исправление
                                                                        </div>
                                                                    </div>
                                                                ))
                                                            )}
                                                        </>
                                                    )}
                                                </>
                                                    ):(
                                                    <div className={styles.emptyModal}>
                                                    </div>
                                                    )}
                                                </>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </>
                        )}
                        <PaginationComponent
                            save={save}
                            page={questionNumber + 1}
                            handleChangeQuestion={handleChangeQuestion}
                            count={questionsData && questionsData.length}
                        />
                    </div>
                </div>
            </div>
            <Faq/>
        </>
    )
};

export default StrategyForm;