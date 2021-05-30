import {
    PRODUCTION_CURRENT_ERROR,
    PRODUCTION_CURRENT_PENDING, PRODUCTION_CURRENT_SUCCESS,
    PRODUCTION_TABLE_ERROR,
    PRODUCTION_TABLE_PENDING,
    PRODUCTION_TABLE_SUCCESS
} from "../../types/AdminTypes";
import {ERROR, PENDING, SUCCESS} from "../../types/types";


const initialState = {
    data:[],
    table_status:'',
    currentItemData:null,
    currentItem_status:''
};

export const ProductionReducer = (state=initialState,action) => {
    switch (action.type) {
        case PRODUCTION_TABLE_PENDING:{
            return {
                ...state,
                table_status: PENDING
            }
        }
        case PRODUCTION_TABLE_SUCCESS:{
            return {
                ...state,
                table_status: SUCCESS,
                data: action.payload
            }
        }
        case PRODUCTION_TABLE_ERROR:{
            return {
                ...state,
                table_status: ERROR
            }
        }
        case PRODUCTION_CURRENT_PENDING:{
            return {
                ...state,
                currentItem_status: PENDING
            }
        }
        case PRODUCTION_CURRENT_SUCCESS:{
            return {
                ...state,
                currentItem_status: SUCCESS,
                currentItemData: action.payload
            }
        }
        case PRODUCTION_CURRENT_ERROR:{
            return {
                ...state,
                currentItem_status: ERROR,
            }
        }
        default:
            return state
    }
};