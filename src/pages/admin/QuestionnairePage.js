import React, {useEffect} from "react";
import AdminTitle from "../../components/AdminComponents/AdminTitle";
import QuestionnaireTable from "../../components/AdminComponents/QuestionnaireTable";
import {useDispatch, useSelector} from "react-redux";
import {getQuestionnaireTableAction} from "../../redux/actions/getQuestionnaireTableAction";

const QuestionnairePage = () => {
    const dispatch = useDispatch();
    const {data} = useSelector(state => state.QuestionnairePage);

    console.log(data);

    useEffect(()=>{
        dispatch(getQuestionnaireTableAction());
    },[]);

    return(
        <div style={{backgroundColor: "#f9f9f9",paddingTop:20, height: '100vh'}}>
            <AdminTitle
                title={"Анкеты"}
                description={"Общее количество компании"}
                count={data ? data.length : "0"}
            />
            <QuestionnaireTable
                data={data}
            />
        </div>
    )
};
export default QuestionnairePage;