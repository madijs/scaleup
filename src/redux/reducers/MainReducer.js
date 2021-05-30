import {SET_FAQ} from "../../types/faqTypes";

const initialState = {
    faqData: null
};

export const MainReducer = (state=initialState,action) => {
    switch (action.type) {
        case SET_FAQ:{
            return{
                ...state,
                faqData: action.payload
            }
        }
        default:{
            return state
        }
    }
};