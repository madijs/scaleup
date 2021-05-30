import axios from "../plugins/axios";

export default class WelcomeService {
    async postResource(url,payload,config){
        return await axios.post(url,payload,config)
    }
    async getResource(url){
        return await axios.get(url);
    }
    async getBlockData(){
        return await this.getResource('/block');
    }
    async updateBlockData(formData){
        const config = {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Accept': 'application/json'
            }
        };
        return await this.postResource('/block',formData,config);
    }
}