import axios from "axios"


export default class NotificationService {
    async getResource(url){
        return await axios.get(url)
    }

    async getNotifications(){
        return await this.getResource('/notifications')
    }
}

