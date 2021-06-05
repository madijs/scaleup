import axios from '../plugins/axios'

export default class AdminService {

    async postResource(url,payload){
        return await axios.post(url,payload)
    }
    async getResource(url){
       return await axios.get(url)
    }

    async putResource(url,payload){
        return await axios.put(url,payload)
    }

    async getPaymentsTableData(){
        return await this.getResource('/payments/list')
    }
    async agreePayment(userId){
        return await this.getResource(`/payments/accepted/${userId}`)
    }
    async getQuestionnaireTable(){
        return await this.getResource('/worksheets')
    }
    async getCurrentQuestionnaireItem(id){
        return await this.getResource(`/sections/moderator/${id}`)
    }

    async acceptQuestionnaire(id){
        return await this.putResource(`/worksheets/ready/${id}`)
    }

    async getProductionTable(){
        return await this.getResource('/productions')
    }

    async getCurrentProductionItem(id){
        return await this.getResource(`/sections/${id}`)
    }

    async getUserInfo(id){
        return await this.getResource(`/users/get/${id}`)
    }

    async getDashboard(){
        return await this.getResource(`/dashboard`)
    }

}