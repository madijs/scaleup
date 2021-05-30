import axios from '../plugins/axios'

export default class MainService {

    async getResource(url){
        return await axios.get(url)
    }

    async getFaqs(){
        return await this.getResource('/top-faqs')
    }

    async getSections(){
        return await this.getResource('/sections')
    }

    async getQuestions(name,id=""){
        if (id.length>0){
            return await this.getResource(`/questions/${name}/${id}`)
        }else{
            return await this.getResource(`/questions/${name}`)
        }
    }

    async getBlock(){
        return await this.getResource(`/block`)
    }

    async getServices(){
        return await this.getResource(`/services`)
    }

    async getJustFaqs(){
        return await this.getResource('/faqs')
    }
}