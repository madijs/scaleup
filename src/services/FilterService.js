import axios from "../plugins/axios"

export default class FilterService {
    async getResource(url,params){
        return await axios.get(url,params)
    }

    async setFilterWorksheets(params){
        return await this.getResource('/worksheets',{params})
    }

    async setFilterProductions(params){
        return await this.getResource('/productions',{params})
    }
    async setReady(params){
        return await this.getResource('/documents/ready',{params})
    }
    async setFilterDocuments(params){
        return await this.getResource('/documents',{params})
    }
}