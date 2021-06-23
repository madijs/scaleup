import axios from "../plugins/axios"

export default class SettingsService {

    async getResource(url){
        return await axios.get(url)
    }

    async postResource(url,payload){
        return axios.post(url,payload
            ,
            {
            headers:{
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        }
        )
    }

    async putResource(url,payload){
        return axios.put(url,payload);
    }

    async deleteResource(url){
        return axios.delete(url);
    }

    async getWorkersAPI(){
        return await this.getResource('/workers')
    }

    async getServicesAPI(){
        return await this.getResource('/services')
    }

    async getUsersAPI(){
        return await this.getResource('/users/list')
    }

    async getWorkersRolesList(){
        return await this.getResource('/roles')
    }

    async createSystemUser(fio,role_id,email,password,password_confirmation,phone){
        const payload = {
            'fio':fio,
            'role_id':role_id,
            'email':email,
            phone,
            'password':password,
            'password_confirmation':password_confirmation
        };
        return await this.postResource('/workers', payload)
    }

    async updateSystemUser(id,fio,role_id,email,password,password_confirmation){
        let payload = {};
        if (password.length>0){
            payload = {
                fio,
                role_id,
                email,
                password,
                password_confirmation
            }
        }else{
            payload = {
                fio,
                role_id,
                email
            }
        }
        return await this.putResource(`/workers/${id}`,payload)
    }

    async updateJustUser(id,fio,phone,company,email,password,password_confirmation){
        let payload = {};
        if (password.length>0){
            payload = {
                fio,
                email,
                company,
                phone,
                password,
                password_confirmation
            }
        }else{
            payload = {
                fio,
                company,
                phone,
                email
            }
        }
        return await this.putResource(`/users/${id}`,payload)
    }

    async deleteSystemUserAPI(id){
        return await this.deleteResource(`/workers/${id}`)
    }

    async updateServiceAPI(id,form){
        return await this.putResource(`/services/${id}`,form)
    }

    async getSectionsAPI(){
        return await this.getResource('/sections')
    }

    async updateFaqsQuestions(form){
        const paylaod = {
            faqs:form
        };
        return await this.putResource('/faqs/update',paylaod)
    }

    async updateFaqsCategory(form){
        const payload = {
            categories: form
        };
        return await this.putResource('/faq-categories/update', payload)
    }

    async deleteCategory(id){
        return await this.deleteResource(`/faq-categories/${id}`)
    }

    async deleteQuestionAPI(id){
        return await this.deleteResource(`/faqs/${id}`)
    }

    async addCategoryAPI(){
        return await this.postResource(`/faq-categories`,{title:"Новая категория"})
    }

    async addQuestionAPI(id){
        return await this.postResource(`/faqs/faq-category/${id}`,{title:"Новый вопрос",text:"Новый ответ"})
    }

    async getAnketaContent(){
        return await this.getResource(`/anketa`)
    }

    async getSelectedAnketaContent(id){
        return await this.getResource(`/anketa/${id}`)
    }
    async anketaUpdate(body){
        return await this.putResource(`/anketa/update`,body)
    }

    async createFolder(folderName,link,userId=''){
        return await this.postResource(`/docs/templates/upload-folder`,{
            folder:folderName,
            link
        })
    }

    async createFolderInProd(folderName,link,userId=''){
        return await this.postResource(`/docs/upload-folder/${userId}`,{
            folder:folderName,
            link
        })
    }


    async getRequirementDocs(){
        return await this.getResource(`/preview-files`)
    }

    async updateRequirementDocs(formData){
        console.log(formData)
        return await this.postResource(`/preview-files`,formData)
    }
}