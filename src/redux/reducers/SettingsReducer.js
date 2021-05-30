import {
    CHANGE_DESCRIPTION, CHANGE_LINK,
    CHANGE_NAME,
    GET_CONTENT_ANKETA_ERROR,
    GET_CONTENT_ANKETA_PENDING,
    GET_CONTENT_ANKETA_SUCCESS, GET_SELECTED_ANKETA_CONTENT_ERROR,
    GET_SELECTED_ANKETA_CONTENT_PENDING,
    GET_SELECTED_ANKETA_CONTENT_SUCCESS,
    SERVICES_DATA_ERROR,
    SERVICES_DATA_PENDING,
    SERVICES_DATA_SUCCESS,
    USERS_LIST_ERROR,
    USERS_LIST_PENDING,
    USERS_LIST_SUCCESS,
    WORKERS_DATA_ERROR,
    WORKERS_DATA_PENDING,
    WORKERS_DATA_SUCCESS
} from "../../types/AdminTypes";
import {ERROR, PENDING, SUCCESS} from "../../types/types";


const initialState = {
    workers:null,
    workers_status:'',
    services: null,
    services_status:'',
    users_list: null,
    users_list_status:'',
    anketa:null,
    content_anketa_status:'',
    selected_anketa: null,
    selected_anketa_status:''
};

export const SettingsReducer = (state=initialState,action) => {
    switch (action.type) {
        case WORKERS_DATA_PENDING:{
            return{
                ...state,
                workers_status: PENDING
            }
        }
        case WORKERS_DATA_SUCCESS:{
            return {
                ...state,
                workers_status: SUCCESS,
                workers: action.payload
            }
        }
        case WORKERS_DATA_ERROR:{
            return {
                ...state,
                workers_status: ERROR
            }
        }
        case SERVICES_DATA_PENDING:{
            return {
                ...state,
                services_status: PENDING
            }
        }
        case SERVICES_DATA_SUCCESS:{
            return {
                ...state,
                services: action.payload,
                services_status: SUCCESS
            }
        }
        case SERVICES_DATA_ERROR:{
            return {
                ...state,
                services_status: ERROR
            }
        }
        case USERS_LIST_PENDING:{
            return {
                ...state,
                users_list_status: PENDING
            }
        }
        case USERS_LIST_SUCCESS:{
            return {
                ...state,
                users_list_status: SUCCESS,
                users_list: action.payload
            }
        }
        case USERS_LIST_ERROR:{
            return {
                ...state,
                users_list_status: ERROR
            }
        }
        case GET_CONTENT_ANKETA_PENDING:{
            return {
                ...state,
                content_anketa_status: PENDING
            }
        }
        case GET_CONTENT_ANKETA_SUCCESS:{
            return {
                ...state,
                content_anketa_status: SUCCESS,
                anketa: action.payload
            }
        }
        case GET_CONTENT_ANKETA_ERROR:{
            return {
                ...state,
                content_anketa_status: ERROR
            }
        }
        case GET_SELECTED_ANKETA_CONTENT_PENDING:{
            return {
                ...state,
                selected_anketa_status: PENDING
            }
        }
        case GET_SELECTED_ANKETA_CONTENT_SUCCESS:{
            return {
                ...state,
                selected_anketa_status: SUCCESS,
                selected_anketa: action.payload
            }
        }
        case GET_SELECTED_ANKETA_CONTENT_ERROR:{
            return {
                ...state,
                selected_anketa_status: ERROR
            }
        }
        case CHANGE_NAME:{
            console.log(action.payload);
            const copyState = {...state};
            copyState.selected_anketa = {...state.selected_anketa};
            copyState.selected_anketa.name = action.payload;
            return copyState;
        }
        case CHANGE_DESCRIPTION:{
            const copyState = {...state};
            copyState.selected_anketa = {...state.selected_anketa};
            copyState.selected_anketa.description = action.payload;
            return copyState;
        }
        case CHANGE_LINK:{
            const copyState = {...state};
            copyState.selected_anketa = {...state.selected_anketa};
            copyState.selected_anketa.link = action.payload;
            return copyState;
        }
        default:
            return state;
    }
};