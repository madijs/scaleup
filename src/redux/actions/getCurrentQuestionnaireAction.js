import {
    QUESTIONNAIRE_CURRENT_ITEM_ERROR,
    QUESTIONNAIRE_CURRENT_ITEM_PENDING,
    QUESTIONNAIRE_CURRENT_ITEM_SUCCESS
} from "../../types/AdminTypes";
import AdminService from "../../services/AdminService";


export const getCurrentQuestionnaireAction = (userId) => async dispatch => {
    dispatch({
        type: QUESTIONNAIRE_CURRENT_ITEM_PENDING
    });
    const response = new AdminService().getCurrentQuestionnaireItem(userId);
    response.then(res=>{
        console.log(res.data);
        dispatch({
            type: QUESTIONNAIRE_CURRENT_ITEM_SUCCESS,
            payload: res.data
        })
    }).catch(err=>{
        dispatch({
            type: QUESTIONNAIRE_CURRENT_ITEM_ERROR
        })
    })
};