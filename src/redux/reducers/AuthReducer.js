import {SET_USER,UPDATE_USER} from "../../types/authTypes";

const initialState = {
    userData: null
};

export const AuthReducer = (state = initialState,action) => {
    switch (action.type) {
        case SET_USER:{
            return{
                ...state,
                userData: action.payload
            }
        }
        case UPDATE_USER:{
            return {
                ...state,
                userData: action.payload
            }
        }
        default:
            return state
    }
};