import React, {useEffect, useState} from "react";
import styles from "../../assets/styles/AdminStyles/AdminFaqPage.module.scss";
import GoBack from "../../components/OtherComponents/GoBack";
import {getJustFaqsAction} from "../../redux/actions/getJustFaqsAction";
import {useDispatch} from "react-redux";
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import trashIcon from "../../assets/icons/trashIcon.svg";
import editIcon from "../../assets/icons/editTableIcon.svg";
import SettingsService from "../../services/SettingsService";
import {useParams,useHistory} from "react-router-dom";

const AdminFaqsPage = () => {
    const {id} = useParams();
    const history = useHistory();
    const dispatch = useDispatch();
    const [allData, setAllData] = useState(null);
    const [currentData, setCurrentData] = useState(allData ? allData[0].faqs[0] : null);
    const [focusTitle,setFocusTitle] = useState('');
    const [focusDescription,setFocusDescription] = useState('');
    const [form,setForm] = useState([]);
    const [category,setCategory] = useState([]);

    const [editCategoryId,setEditCategoryId] = useState(null );

    const openQuestionsHandleChange = id => {
        console.log(id);
        for (let i = 0; i < allData.length; i++) {
            if (allData[i].id == id) {
                console.log(allData[i]);
                history.push('/admin/faqs/'+id);
                setCurrentData(allData[i]);
                setEditCategoryId('')
            }
        }
    };

    const getFaqsFunc = () => {
        const response = dispatch(getJustFaqsAction());
        response.then(res => {
            console.log(res.data);
            setAllData(res.data);
            setCurrentData(res.data[0]);
            console.log(res)
            if (id){
                for (let i = 0; i < res.data.length; i++) {
                    if (res.data[i].id == id) {
                        console.log(res.data[i]);
                        history.push('/admin/faqs/'+id);
                        setCurrentData(allData[i]);
                        setEditCategoryId('')
                    }
                }            }
        }).catch(err => {
            console.log(err)
        })
    };



    useEffect(() => {
        getFaqsFunc();
    }, []);

    useEffect(()=>{
        if (currentData){
            const copy = [...form];
            for (let i=0;i<currentData.faqs.length;i++){
                copy[i] = {
                    id: currentData.faqs[i].id,
                    title : currentData.faqs[i].title,
                    text: currentData.faqs[i].text
                }
            }
            console.log(form);
            setForm(copy)
        }
    },[currentData]);

    useEffect(async ()=>{
        if (allData){
            const copy = [...category];
            for (let i=0;i<allData.length;i++){
                copy[i] = {
                    id: allData[i].id,
                    title: allData[i].title
                }
            }
            await setCategory(copy);
            openQuestionsHandleChange(id);
        }
    },[allData]);

    const handleFaqsQuestionChange = (index,value) => {
        const copy = [...form];
        copy[index].title = value;
        setForm(copy)
    };

    const handleFaqsAnswerChange = (index,value) => {
        const copy = [...form];
        copy[index].text = value;
        setForm(copy);
    };

    const updateFaqs = async () => {

        const response = new SettingsService().updateFaqsQuestions(form);
        response.then(res=>{
            getFaqsFunc();
        });
        const response2 = new SettingsService().updateFaqsCategory(category);
        response2.then(res=>{
            getFaqsFunc();
        })

    };

    const handleFaqsCategoryChange = (index,value) => {
        const copy = [...category];
        copy[index] = {...category[index]};
        copy[index].title = value;
        setCategory(copy);
    };

    const deleteCategory = (id) => {
        const response = new SettingsService().deleteCategory(id);
        response.then(res=>{
            let arr = [];
            for (let i=0;i<category.length;i++){
                if (id !== category[i].id){
                    arr.push(category[i]);
                }
            }
            setCategory(arr);
        })
    };

    const addCategory = () => {
        const response = new SettingsService().addCategoryAPI();
        response.then(res=>{
            getFaqsFunc();
        })
    };

   const addQuestion = () => {
       const response = new SettingsService().addQuestionAPI(currentData.id);
       response.then(res=>{
           getFaqsFunc();
       })
        // const response = new SettingsService().addQuestionAPI(currentData.id);
        // response.then(res=>{
        //     console.log(res.data);
        //     console.log(allData);
        //     const copy = [...allData];
        //     for (let i=0;i<copy.length;i++){
        //         if (res.data.faq_category_id == copy[i].id){
        //             copy[i].faqs.push(res.data);
        //         }
        //     }
        //     console.log(copy);
        //     setAllData(copy);
        //     // getFaqsFunc();
        // })
   };

   const deleteQuestion = (id) => {
       const response = new SettingsService().deleteQuestionAPI(id);
       response.then(res=>{
           getFaqsFunc();
           let arr = [];
           for (let i=0;i<form.length;i++){
               if (form[i].id!==id){
                   arr.push(form[i])
               }
           }
           setForm(arr);
       });
   };

   console.log(allData);
   console.log(currentData);


    return (
        <div className={styles.container}>
            <div className={styles.faqPage_container}>
                <div className={styles.head}>
                    <GoBack title={"Вопросы-ответы"}/>
                    <div onClick={updateFaqs} className={styles.savebtn}>
                        Сохранить
                    </div>
                </div>
                <div className={styles.faqPage_block}>
                    {allData && (
                        <>
                            <div className={styles.section_block}>
                                <div onClick={addCategory} className={styles.add_text}>Добавить категорию</div>
                                {category.map((el, index) => (
                                    <div
                                        className={styles.section_title} key={index}>
                                        {editCategoryId === el.id ? (
                                            <TextareaAutosize
                                                rowsMax={1}
                                                style={currentData && currentData.id === el.id ? {
                                                    fontWeight: 'bold',
                                                    fontSize: 16,
                                                    color: '#000'
                                                } : {}}
                                                onChange={(e)=>handleFaqsCategoryChange(index,e.target.value)}
                                                className={editCategoryId === el.id ? `${styles.focus} ${styles.title_txt}` : `${styles.title_txt}`}
                                                value={el.title}
                                                id="standard-basic"/>
                                        ):(
                                            <div
                                                onClick={openQuestionsHandleChange.bind(this, el.id)}
                                                style={currentData && currentData.id === el.id ? {
                                                    fontWeight: 'bold',
                                                    fontSize: 16,
                                                    color: '#000'
                                                } : {}}
                                                className={styles.title_txt}>
                                                {el.title}
                                            </div>
                                        )}
                                        {currentData && currentData.id === el.id && (
                                            <div className={styles.actions}>
                                                {editCategoryId ? (
                                                    <div onClick={()=>setEditCategoryId(null)} className={styles.close}>
                                                    </div>
                                                ):(
                                                    <>
                                                        <div onClick={()=>setEditCategoryId(el.id)} className={styles.editIcon}>
                                                            <img src={editIcon} alt="editImg"/>
                                                        </div>
                                                    </>
                                                )}
                                                <div onClick={deleteCategory.bind(this, el.id)} className={styles.trashIcon}>
                                                    <img src={trashIcon} alt="trashImg"/>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                            {currentData && (
                                <div className={styles.questions_block}>
                                    <div onClick={addQuestion} className={styles.add_text}>
                                        Добавить вопрос
                                    </div>
                                    {form.length && currentData?.faqs.map((el, index) => (
                                        <div className={styles.question}>
                                            <div className={styles.question_title}>
                                                <TextareaAutosize
                                                    rowsMax={1}
                                                    value={form[index] && form[index].title}
                                                    className={focusTitle === el.id ? `${styles.focus} ${styles.title}` : `${styles.title}`}
                                                    onFocus={()=>{
                                                        setFocusTitle(el.id)
                                                    }}
                                                    onChange={(e)=>{
                                                        handleFaqsQuestionChange(index,e.target.value);
                                                    }}
                                                    onBlur={()=>{
                                                        setFocusTitle('')
                                                    }}
                                                    id="standard-basic"/>
                                                    <div onClick={deleteQuestion.bind(this,el.id)} className={styles.trashIcon}>
                                                        <img src={trashIcon} alt="trashImg"/>
                                                    </div>
                                            </div>
                                            <div className={styles.question_answer}>
                                                <TextareaAutosize
                                                    rowsMax={5}
                                                    key={index}
                                                    className={focusDescription === el.id && `${styles.focus}`}
                                                    value={form[index] && form[index].text}
                                                    onFocus={()=>{
                                                        setFocusDescription(el.id)
                                                    }}
                                                    onChange={(e)=>{
                                                        handleFaqsAnswerChange(index,e.target.value);
                                                    }}
                                                    onBlur={()=>{
                                                        setFocusDescription('')
                                                    }}
                                                    aria-label="empty textarea"
                                                    placeholder="Введите ответ"
                                                />
                                            </div>
                                            <div className={styles.line}>

                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </>
                    )}
                </div>
            </div>
        </div>
    )
};
export default AdminFaqsPage;