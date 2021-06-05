import {PAYMENT_TABLE_ERROR, PAYMENT_TABLE_PENDING, PAYMENT_TABLE_SUCCESS} from "../../types/AdminTypes";
import {ERROR, PENDING, SUCCESS} from "../../types/types";


const initialState = {
    card_paid_data:[],
    invoice_paid_data:[],
    dont_paid_data:[],
    status:'',
};

export const AdminReducer = (state=initialState,action) => {
    switch (action.type) {
        case PAYMENT_TABLE_PENDING:{
            return {
                ...state,
                status: PENDING
            }
        }
        case PAYMENT_TABLE_SUCCESS:{
            const copyState = {...state};
            console.log(action.payload)
            const card = [];
            const invoice = [];
            const dont = [];

            for (let i=0;i<action.payload.length;i++){
                if (action.payload[i].payment_type.id === 1){
                    card.push(action.payload[i])
                }else if (action.payload[i].payment_type.id === 2){
                    invoice.push(action.payload[i])
                }else{
                    dont.push(action.payload[i])
                }
            }
            copyState.card_paid_data = card;
            copyState.invoice_paid_data = invoice;
            copyState.dont_paid_data = dont;
            copyState.status = SUCCESS;
            return copyState;
        }
        case PAYMENT_TABLE_ERROR:{
            return {
                ...state,
                status: ERROR
            }
        }
        default:
            return state
    }
};