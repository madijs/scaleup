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
import ChangeStatusModal from "../../pages/admin/ChangeStatusModal";
import Modal from "react-modal";
import TextField from "@material-ui/core/TextField/TextField";
import trashIcon from "../../assets/icons/trashIcon.svg";
import lep from "../../assets/icons/lep.svg";
import {saveAnketaValueAction} from "../../redux/actions/anketa/saveAnketaValueAction";
import {CREATE_ANKETA_FORM, DELETE_COMMENT} from "../../types/anketaTypes";
import ErrorPopupModal from "../OtherComponents/ErrorPopupModal";

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

const MarketingForm = () => {
    const history = useHistory();
    const {id} = useParams();
    const location = useLocation();
    const dispatch = useDispatch();
    const {userData} = useSelector(state => state.AuthPage);
    const {questionsData,completed} = useSelector(state => state.AnketaPage);
    const [questionNumber, setQuestionNumber] = useState(0);
    const [commentOpen, setOpen] = useState(false);
    const [commentInfo, setInfo] = useState(null);
    const search = new URLSearchParams(useLocation().search);


    const handleChangeQuestion = (event, newPage) => {
        window.scroll({top: 0, left: 0, behavior: 'smooth'});
        setQuestionNumber(newPage - 1);
        history.replace(`?page=${newPage}`);
    };

    const getStrategyQuestion = () => {
        if (userData.roles[0].name === "client") {
            const response = new MainService().getQuestions('marketing');
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
            const response = new MainService().getQuestions('marketing',id);
            response.then(res => {
                dispatch({
                    type: CREATE_ANKETA_FORM,
                    payload: res.data
                });
            });
            response.catch(err => {
                console.log(err)
            })
        }
    };

    useEffect(() => {
        document.title = "Маркетинговый раздел";
        if (userData.roles[0].name === "client") {
            const response = new MainService().getQuestions('marketing');
            response.then(res => {
                dispatch({
                    type: CREATE_ANKETA_FORM,
                    payload: res.data
                });
            });
            response.catch(err => {
            })
        }else{
            const response = new MainService().getQuestions('marketing',id);
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

    const save = () => {
        setModal('');
        if (userData.roles[0].name === "client"){
            dispatch(saveAnketaValueAction(userData.id,questionsData,'marketing'));
        }else{
            dispatch(saveAnketaValueAction(localStorage.getItem('user_id'),questionsData,'marketing'));
        }
    };

    const saveAnketa = () => {
        save();
        if (userData.roles[0].name === 'client') {
            const response = new AnketaService().savedAnketa('marketing');
            response.then(res => {
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
                contentLabel="Example Modal"
            >
                <ChangeStatusModal section={"marketing"} closeStatusModal={closeStatusModal}/>
            </Modal>
            <Modal
                isOpen={successSavedModal}
                onRequestClose={closeStatusModal}
                style={customStyles}
                contentLabel=""
            >
                <ErrorPopupModal
                    data={{type:"success",title:"Отлично",text:"Анкета успешно сохранена!"}}
                    closePopupHandleChange={closeSuccessSaved}
                />
            </Modal>
            <div className={styles.container_header}>
                <GoBack title={"Маркетинговый раздел"} subtitle={questionsData ? `${questionsData.length} вопросов` : "0 вопросов"}/>
                <div className={styles.save_btns}>
                    {!location.pathname.includes('/questionnaire') && (
                        <SaveBtn
                            save={saveAnketa}
                            // disabled={isSave}
                            title={"Сохранить"}
                        />
                    )}
                    {location.pathname.includes('/admin/questionnaire/marketing/') ? (
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
                                            <div style={{flex: 0.9}} className={styles.title_container}>
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
                                                <div key={el.key} style={{margin: '16px 10px 0 0', flex: 1}}>
                                                    <QuestionTextFieldInput
                                                        questionNumber={questionNumber}
                                                        index={index}
                                                        user_id={id}
                                                        getStrategyQuestion={getStrategyQuestion}
                                                        id={el.id}
                                                        key={el.key}
                                                        questionsData={questionsData[questionNumber].forms[index]}
                                                        placeholder={el.placeholder}
                                                        title={!questionsData[questionNumber].title && `Вопросы ${questionNumber + 1} из ${questionsData.length}`}
                                                        text={el.title}
                                                        commentOpen={commentOpen}
                                                        setOpen={setOpen}
                                                        setInfo={setInfo}
                                                        commentInfo={commentInfo}
                                                        allData={questionsData}
                                                    />
                                                </div>
                                            )}
                                            {el.type == 2 && (
                                                <div style={{margin: '16px 0', flex: 1}}>
                                                    <QuestionRadioInput
                                                        questionNumber={questionNumber}
                                                        index={index}
                                                        user_id={id}
                                                        questionsData={questionsData[questionNumber].forms[index]}
                                                        id={el.id}
                                                        key={el.key}
                                                        placeholder={el.placeholder}
                                                        title={!questionsData[questionNumber].title && `Вопросы ${questionNumber + 1} из ${questionsData.length}`}
                                                        text={el.title}
                                                        getStrategyQuestion={getStrategyQuestion}
                                                        commentOpen={commentOpen}
                                                        setOpen={setOpen}
                                                        setInfo={setInfo}
                                                        commentInfo={commentInfo}
                                                        allData={questionsData}
                                                    />
                                                </div>
                                            )}
                                            {el.type == 3 && (
                                                <div key={el.key} style={{margin: '16px 10px 0 0', flex: 1}}>
                                                    <QuestionFileInput
                                                        section={"marketing"}
                                                        user_id={id}
                                                        getStrategyQuestion={getStrategyQuestion}
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
                                                        allData={questionsData}
                                                    />
                                                </div>
                                            )}
                                            {el.type == 4 && (
                                                <div key={el.key} style={{margin: '16px 10px 0 0', flex: 1}}>
                                                    <QuestionCheckboxInput
                                                        questionNumber={questionNumber}
                                                        index={index}
                                                        user_id={id}
                                                        id={el.id}
                                                        questionsData={questionsData[questionNumber].forms[index]}
                                                        key={el.key}
                                                        placeholder={el.placeholder}
                                                        title={!questionsData[questionNumber].title && `Вопросы ${questionNumber + 1} из ${questionsData.length}`}
                                                        text={el.title}
                                                        getStrategyQuestion={getStrategyQuestion}
                                                        commentOpen={commentOpen}
                                                        setOpen={setOpen}
                                                        setInfo={setInfo}
                                                        commentInfo={commentInfo}
                                                        allData={questionsData}
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
                                            ):(
                                                <>
                                                {(userData && (userData.roles[0].name === "admin" || userData.roles[0].name === "moderator") && !location.pathname.includes("questionnaire")) ? (
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
                                                                const response = new AnketaService().setComment(el.answer.id,newCommentInfo,"marketing");
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
                                                                                src="data:image/jpeg;base64,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"
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
                                                            ):(
                                                                <div onClick={handleNewComment.bind(this,el,index)} className={styles.new_comment}>
                                                                    <div className={styles.img}><img src={lep} alt="comment"/></div>
                                                                    <div className={styles.text}>
                                                                        Отправить на исправление
                                                                    </div>
                                                                </div>
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
                        <PaginationComponent save={save} page={questionNumber + 1} handleChangeQuestion={handleChangeQuestion}
                                             count={questionsData && questionsData.length}/>
                    </div>
                </div>
            </div>
        </>
    )
};

export default MarketingForm;