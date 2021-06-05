import {
    CREATE_ANKETA_FORM,
    SET_CHECKBOX_ANKETA_VALUE,
    SET_INPUT_ANKETA_VALUE,
    SET_RADIO_ANKETA_VALUE,
    SAVE_ANKETA_VALUE_PENDING,
    SAVE_ANKETA_VALUE_SUCCESS,
    SAVE_ANKETA_VALUE_ERROR,
    CHECK_COMPLETED_ANSWERS,
    SAVE_FILE_IN_ANKETA,
    DELETE_COMMENT
} from "../../types/anketaTypes";
import {ERROR, PENDING, SUCCESS} from "../../types/types";
import {act} from "@testing-library/react";

const initialState = {
    questionsData:null,
    completed:'',
    save_status:''
};

export const AnketaReducer = (state=initialState,action) => {
    switch (action.type) {
        case CHECK_COMPLETED_ANSWERS:{
            const data = action.payload;
            let completed_answers_count = 0;
            let all_question_count = 0;
            for (let questionNumber=0;questionNumber<data.length;questionNumber++) {
                all_question_count+= data[questionNumber].forms.length;
                for (let i = 0;i<data[questionNumber].forms.length;i++) {
                    if (data[questionNumber].forms[i].type == 1){
                        if (data[questionNumber].forms[i].answer && data[questionNumber].forms[i].answer.answers){
                            completed_answers_count+=1;
                        }
                    }else if (data[questionNumber].forms[i].type == 4){
                        let bool = false;
                        for (let j in data[questionNumber].forms[i].answers){
                            if (data[questionNumber].forms[i].answers[j].checked){
                                bool = true;
                            }
                        }
                        if (bool){
                            completed_answers_count+=1;
                        }
                    }else if (data[questionNumber].forms[i].type == 2){
                        let bool = false;
                        for (let j in data[questionNumber].forms[i].answers){
                            if (data[questionNumber].forms[i].answers[j].checked){
                                bool = true;
                            }
                        }
                        if (bool){
                            completed_answers_count+=1;
                        }
                    }else if (data[questionNumber].forms[i].type == 3){
                        if (data[questionNumber].forms[i].answer && data[questionNumber].forms[i].answer.answers){
                            completed_answers_count+=1;
                        }
                    }
                }
            }
                return {
                ...state,
                completed: Math.ceil(completed_answers_count/all_question_count*100)
                }
        }
        case CREATE_ANKETA_FORM:{
            const data = action.payload;
            let completed_answers_count = 0;
            let all_question_count = 0;
            for (let questionNumber=0;questionNumber<data.length;questionNumber++){
                all_question_count+= data[questionNumber].forms.length;
                for (let i = 0;i<data[questionNumber].forms.length;i++){
                    if (data[questionNumber].forms[i].answer && data[questionNumber].forms[i].answer.answers){
                        completed_answers_count+=1;
                    }
                    let obj = {};
                    let drugoe = "";
                    if (data[questionNumber].forms[i].answers) {
                        for (const [key, value] of Object.entries(data[questionNumber].forms[i].answers)) {
                            if (value == "Другое:") {
                                drugoe = key;
                            }
                            obj[key] = {
                                [key]: value,
                                checked: false,
                            };
                            data[questionNumber].forms[i].answers = obj;
                        }
                    }
                        if (data[questionNumber].forms[i].answer && data[questionNumber].forms[i].answer.answers) {
                            let str = "ans-";
                            // let obj = {};
                            // let drugoe = "";
                            for (const [key, value] of Object.entries(data[questionNumber].forms[i].answer.answers)) {
                                if ((str + key) == drugoe) {
                                    // setFormAnswer(value);
                                    // setFormDisabled(false);
                                    obj[str + key] = {
                                        [str + key]: "Другое:",
                                        checked: true,
                                        data: value,
                                    }
                                } else {
                                    obj[str + key] = {
                                        [str + key]: value,
                                        checked: true
                                    };
                                }
                                data[questionNumber].forms[i].answers = obj;
                            }
                        }
                }
            }
            return {
                ...state,
                questionsData: data,
                completed: Math.ceil(completed_answers_count/all_question_count*100)
            }
        }
        case SET_INPUT_ANKETA_VALUE:{
            const copyState = {...state};
            const form = state.questionsData[action.payload.questionNumber].forms[action.payload.index];
            copyState.questionsData[action.payload.questionNumber].forms[action.payload.index] = {...form};
            copyState.questionsData[action.payload.questionNumber].forms[action.payload.index].answer = {...form.answer};
            copyState.questionsData[action.payload.questionNumber].forms[action.payload.index].answer.answers = {
                '1': action.payload.value
            };
            return copyState;
        }
        case SET_CHECKBOX_ANKETA_VALUE:{
            const copyState = {...state};
            copyState.questionsData = [...state.questionsData];
            const form = state.questionsData[action.payload.questionNumber].forms[action.payload.index];
            copyState.questionsData[action.payload.questionNumber].forms[action.payload.index] = {...form};
            copyState.questionsData[action.payload.questionNumber].forms[action.payload.index].answers = {...form.answers};
            if (!action.payload.bool){
                copyState.questionsData[action.payload.questionNumber].forms[action.payload.index].answers[action.payload.name].checked = !copyState.questionsData[action.payload.questionNumber].forms[action.payload.index].answers[action.payload.name].checked
            }
            copyState.questionsData[action.payload.questionNumber].forms[action.payload.index].answers[action.payload.name].data = action.payload.data;
            return copyState;
        }
        case SET_RADIO_ANKETA_VALUE: {
            const copyState = {...state};
            copyState.questionsData = [...state.questionsData];
            const form = state.questionsData[action.payload.questionNumber].forms[action.payload.index];
            copyState.questionsData[action.payload.questionNumber].forms[action.payload.index] = {...form};
            copyState.questionsData[action.payload.questionNumber].forms[action.payload.index].answers = {...form.answers};
            for (const [key, value] of Object.entries(copyState.questionsData[action.payload.questionNumber].forms[action.payload.index].answers)){
                if (key === action.payload.name){
                    copyState.questionsData[action.payload.questionNumber].forms[action.payload.index].answers[key].checked = true;
                }else{
                    copyState.questionsData[action.payload.questionNumber].forms[action.payload.index].answers[key].checked = false;
                }
            }
            let obj = {};
            let i=1;
            for (const [key, value] of Object.entries(copyState.questionsData[action.payload.questionNumber].forms[action.payload.index].answers)) {
                if (copyState.questionsData[action.payload.questionNumber].forms[action.payload.index].answers[key].checked){
                    obj[i] = value[key];
                }
                i++;
            }
            copyState.questionsData[action.payload.questionNumber].forms[action.payload.index].answers[action.payload.name].data = action.payload.data;
            return copyState;
        }
        case DELETE_COMMENT:{
            const copyState = {...state};
            for (let i=0;i<copyState.questionsData[action.payload.questionNumber].forms.length;i++){
                if(copyState.questionsData[action.payload.questionNumber].forms[i].answer){
                    if (copyState.questionsData[action.payload.questionNumber].forms[i].answer.commentary){
                        if (copyState.questionsData[action.payload.questionNumber].forms[i].answer.commentary.id == action.payload.comment_id){
                            copyState.questionsData[action.payload.questionNumber].forms[i].answer.commentary = null
                        }
                    }
                }
            }
            return copyState
        }
        case SAVE_ANKETA_VALUE_PENDING:{
            return {
                ...state,
                save_status: PENDING
            }
        }
        case SAVE_ANKETA_VALUE_SUCCESS:{

            return {
                ...state,
                save_status: SUCCESS
            }
        }
        case SAVE_ANKETA_VALUE_ERROR:{
            return {
                ...state,
                save_status: ERROR
            }
        }
        case SAVE_FILE_IN_ANKETA:{
            const copyState = {...state};
            copyState.questionsData = [...state.questionsData];
            for (let i=0;i<copyState.questionsData.length;i++){
                for (let j=0;j<copyState.questionsData[i].forms.length;j++){
                    if (action.id == copyState.questionsData[i].forms[j].id){
                        copyState.questionsData[i].forms[j].answer = action.payload
                    }
                }
            }
            return copyState;
        }
        default:
            return state
    }
};