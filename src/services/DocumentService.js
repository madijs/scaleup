import axios from '../plugins/axios'

export default class DocumentService {

    async putResource(url,payload){
        return await axios.put(url,payload)
    }

    async getResource(url){
        return await axios.get(url)
    }

    async getDocumentTable(){
        return await this.getResource('/documents')
    }

    async getSuccessDocumentTable(){
        return await this.getResource('/documents/ready')
    }

    async getUserFiles(id){
        return await this.getResource(`/docs/get-user-files/${id}`)
    }

    async shareDocs(section,value){
        const payload = {
            section,
            value
        };
        return await this.putResource('/public-document/update',payload)
    }

    async getUnauthorizedSharedDocs(token){
        return await this.getResource(`/public-document/get?token=${token}`,{
            params:{
                token: token
            }
        })
    }

    async editDocs(){
        return await this.getResource('/')
    }


    async getTemplates(){
        return await this.getResource(`/docs/templates`)
    }

}