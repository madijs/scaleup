import React, {useEffect, useState} from "react";
import styles from "../assets/styles/FaqStyles/FaqPage.module.scss"
import GoBack from "../components/OtherComponents/GoBack";
import FaqList from "../components/FaqComponents/FaqList";
import {useDispatch} from "react-redux";
import {getJustFaqsAction} from "../redux/actions/getJustFaqsAction";
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles((theme) => ({
    formControl: {
        width: '100%',
        background: 'rgba(143, 146, 161, 0.05)',
        borderRadius: '16px'
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));

const FaqPage = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const [section, setSection] = React.useState({
        id:'',
        text:''
    });
    // const {faqData} = useSelector(state => state.MainPage);
    const [allData,setAllData] = useState(null);

    const [currentData,setCurrentData] = useState( null);


    useEffect(()=>{
       const response = dispatch(getJustFaqsAction());
       response.then(res=>{
           console.log(res.data);
           setAllData(res.data);
           setCurrentData(res.data[0]);
           if (res.data.length>0){
               setSection({
                   id: res.data[0].id,
                   text: res.data[0].text
               });
               console.log(res.data[0])
           }
           console.log(res)
       }).catch(err=>{
           console.log(err)
       })
    },[]);

    const openQuestionsHandleChange = id => {
        for (let i=0;i<allData.length;i++){
            if(allData[i].id === id){
                setCurrentData(allData[i])
            }
        }
    };

    const handleChange = (event) => {
        for (let i=0;i<allData.length;i++){
            if (event.target.value == allData[i].id){
                setSection({
                    id: event.target.value,
                    text: allData[i].title
                })
            }
        }
        for (let i=0;i<allData.length;i++){
            if(allData[i].id == event.target.value){
                setCurrentData(allData[i])
            }
        }
    };

    return(
        <div className={styles.container}>
            <div className={styles.faqPage_container}>
                <GoBack title={"Часто задаваемые вопросы"}/>
                <div className={styles.faqPage_block}>
                    {allData && (
                        <>
                            <div className={styles.section_block}>
                                {allData.map((el,index)=>(
                                    <div
                                        style={currentData && currentData.id === el.id ? {fontWeight:'bold',fontSize:16,color:'#000'} : {}}
                                         onClick={openQuestionsHandleChange.bind(this,el.id)} className={styles.section_title} key={index}>{el.title}</div>
                                ))}
                            </div>
                            <div className={styles.section_block_mobile}>
                                <FormControl variant="filled" className={classes.formControl}>
                                    <Select
                                        className={styles.select}
                                        labelId="demo-simple-select-filled-label"
                                        id="demo-simple-select-filled"
                                        value={section.id}
                                        style={{borderRadius:'16px',background: 'rgba(143, 146, 161, 0.05)'}}
                                        onChange={handleChange}
                                    >
                                        {allData.map((el,index)=>(
                                            <MenuItem className={styles.menuItem} key={index} value={el.id}>{el.title}</MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </div>
                            {currentData && (
                                <div className={styles.questions_block}>
                                    <FaqList faqDatas={currentData ? currentData.faqs : []}/>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </div>
        </div>
    )
};

export default FaqPage