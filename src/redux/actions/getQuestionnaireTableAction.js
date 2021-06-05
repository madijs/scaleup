import {
    QUESTIONNAIRE_TABLE_ERROR,
    QUESTIONNAIRE_TABLE_PENDING,
    QUESTIONNAIRE_TABLE_SUCCESS
} from "../../types/AdminTypes";
import AdminService from "../../services/AdminService";

export const getQuestionnaireTableAction = () => async dispatch => {
    dispatch({
        type: QUESTIONNAIRE_TABLE_PENDING
    });
    const response = new AdminService().getQuestionnaireTable();
    response.then(res=>{
        dispatch({
            type: QUESTIONNAIRE_TABLE_SUCCESS,
            payload: res.data
        })
    }).catch(err=>{
        dispatch({
            type: QUESTIONNAIRE_TABLE_ERROR
        })
    })
};