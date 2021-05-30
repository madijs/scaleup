import axios from '../plugins/axios'

export default class AuthService {

    async postResource(url,payload){
        return axios.post(url,payload);
    }
    async getResource(url){
        return axios.get(url);
    }

    async putResource(url,payload){
        return axios.put(url,payload);
    }

    async signUp(fio,company,phone,email,password,password_confirmation){
        const paylaod = {
            fio,
            company,
            phone,
            email,
            password,
            password_confirmation
        };
        return this.postResource('/register',paylaod)
    }

    async signIn(email,password){
        const payload = {
            email,
            password
        };
        return this.postResource('/login',payload)
    }

    async getMe(){
        return this.getResource(`/users/me`)
    }

    async updateUser(company,fio,email,phone){
        const payload = {
            company,
            fio,
            email,
            phone
        };
        return this.putResource(`/users/update/me`,payload)
    }

    async updatePassword(password,password_confirmation){
        const payload = {
            password,
            password_confirmation
        };
        return this.putResource(`/users/update/password`,payload)
    }

    async forgottenPassword(email){
        const payload = {
            email,
        };
        return this.postResource(`/forgot`,payload)
    }

    async changePassword(token,password,password_confirmation,email){
        const paylaod = {
            token,
            password,
            password_confirmation,
            email
        };
        return this.postResource(`/password/reset`,paylaod)
    }

    async accessVerifyRegistration(id,expires,hash,signature){
        return this.getResource(`/email/verify/${id}?expires=${expires}&hash=${hash}&signature=${signature}`)
    }

    async saveProfileAvatar(payload){
        return this.postResource(`users/avatar/save`,payload)
    }
}