import {
    QUESTIONNAIRE_CURRENT_ITEM_ERROR,
    QUESTIONNAIRE_CURRENT_ITEM_PENDING, QUESTIONNAIRE_CURRENT_ITEM_SUCCESS,
    QUESTIONNAIRE_TABLE_ERROR,
    QUESTIONNAIRE_TABLE_PENDING,
    QUESTIONNAIRE_TABLE_SUCCESS
} from "../../types/AdminTypes";
import {ERROR, PENDING, SUCCESS} from "../../types/types";

const initialState = {
    data: [],
    status: '',
    currentItemData:null,
    currentItem_status:''
};

export const QuestionnaireReducer = (state=initialState,action) => {
    switch (action.type) {
        case QUESTIONNAIRE_TABLE_PENDING:{
            return{
                ...state,
                status: PENDING
            }
        }
        case QUESTIONNAIRE_TABLE_SUCCESS:{
            return {
                ...state,
                status: SUCCESS,
                data: action.payload
            }
        }
        case QUESTIONNAIRE_TABLE_ERROR:{
            return {
                ...state,
                status: ERROR
            }
        }
        case QUESTIONNAIRE_CURRENT_ITEM_PENDING:{
            return {
                ...state,
                currentItem_status: PENDING
            }
        }
        case QUESTIONNAIRE_CURRENT_ITEM_SUCCESS:{
            return {
                ...state,
                currentItem_status: SUCCESS,
                currentItemData:action.payload
            }
        }
        case QUESTIONNAIRE_CURRENT_ITEM_ERROR:{
            return {
                ...state,
                currentItem_status: ERROR
            }
        }
        default:
            return state
    }
};