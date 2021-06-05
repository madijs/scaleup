import axios from '../plugins/axios'
import {idID} from "@material-ui/core/locale";


export default class PaymentSerivce {

    async postResource(url,payload,config=null){
            return await axios.post(url,payload)
    }

    async getResource(url){
        return await axios.get(url);
    }

    async setServicePay(serviceId){
        const payload = {
            payment_type_id: 3,
            service_id : serviceId
        };
        return await this.postResource('/payments',payload)
    }

    async userPayments(){
        return await this.getResource('/users/payments');
    }

    async paymentSelect(id){
        return await this.postResource('/payments/select',{payment_type_id:id})
    }

    async paymentInvoice(file){
        const config = {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Accept': 'application/json'
            }
        };
        return await axios.post('/payments/invoice',file,config)
    }

    async setBinAndFio(info,fio){
        return await this.getResource(`/payments/invoice/create?info=${info}&fio=${fio}`,{
            params:{
                info,
                fio
            }
        })
    }
}