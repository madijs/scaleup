import {
    DOCUMENT_PREVIEW_SUCCESS,
    DOCUMENT_TABLE_ERROR,
    DOCUMENT_TABLE_PENDING,
    DOCUMENT_TABLE_SUCCESS
} from "../../types/documentTypes";
import {ERROR, PENDING, SUCCESS} from "../../types/types";

const initialState = {
    data: null,
    docsData: null,
    document_status: ''
};

export const DocumentReducer = (state=initialState,action) => {
    switch (action.type) {
        case DOCUMENT_TABLE_PENDING:{
            return{
                ...state,
                document_status: PENDING
            }
        }
        case DOCUMENT_TABLE_SUCCESS:{
            const copy = {...state};
            copy.data = action.payload;
            copy.document_status = SUCCESS;
            return copy
        }
        case DOCUMENT_TABLE_ERROR:{
            return {
                ...state,
                document_status: ERROR
            }
        }
        case DOCUMENT_PREVIEW_SUCCESS:{
            return {
                ...state,
                docsData: action.payload
            }
        }
        default:
            return state
    }
};