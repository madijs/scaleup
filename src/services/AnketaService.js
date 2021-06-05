import axios from "../plugins/axios"

export default class AnketaService {

    async postResource(url, payload, config = null) {
        if (config) {
            return await axios.post(url, payload, config);
        } else {
            return await axios.post(url, payload);
        }
    }

    async putResource(url, payload) {
        return await axios.put(url, payload);
    }

    async getResource(url){
        return await axios.get(url);
    }

    async saveForm(id, answer, type = 1, user_id = '',section='') {
        console.log(answer);
        console.log(type);
        if (type === 3) {
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Accept': 'application/json'
                }
            };
            const formData = new FormData();
            let checkArr = [0, 0];
            formData.append('form_id', id);
            // formData.append('type', type);
            for (let i = 0; i < answer.length; i++) {
                if (answer[i].slice(0, 7) === "answers") {
                    checkArr[0] = 1;
                    formData.append('repeated[]', answer[i]);
                } else {
                    checkArr[1] = 1;
                    formData.append('answers[]', answer[i]);
                }
            }
            if (checkArr[0] === 0) {
                formData.append('repeated', 'empty')
            }
            if (checkArr[1] === 0) {
                formData.append('answers', 'empty');
            }
            formData.append("section",section);
            if (user_id.length>0){
                return await this.postResource(`/answers/${user_id}`, formData, config);
            }else{
                return await this.postResource(`/answers`, formData, config);
            }
        }
        if (type === 1) {
            let obj = answer.answers;
            let bool = true;
            for (const [key, value] of Object.entries(answer.answers)) {
                if (value === "") {
                    bool = false;
                    break;
                }
            }
            let payload = {};
            if (!bool) {
                payload = {
                    form_id: id,
                    type: type,
                    answers: 'empty',
                    repeated: 'empty'
                };
            } else {
                payload = {
                    form_id: id,
                    type: type,
                    answers: obj,
                    repeated: 'empty'
                };
            }
            if (user_id.length>0){
                return await this.postResource(`/answers/${user_id}`, payload);
            }else{
                return await this.postResource(`/answers`, payload);
            }
        }
        if (type === 4) {
            let payload = {};
            if (Object.keys(answer).length > 0) {
                payload = {
                    form_id: id,
                    answers: answer,
                    type: type,
                    repeated: "empty"
                };
            } else {
                payload = {
                    form_id: id,
                    answers: "empty",
                    type: type,
                    repeated: "empty"
                };
            }
            if (user_id.length>0){
                return await this.postResource(`/answers/${user_id}`, payload);
            }else{
                return await this.postResource(`/answers`, payload);
            }
        }
    }

    async commentReadIt(id) {
        return await this.postResource(`/commentary/${id}/read`)
    }

    async saveAnketa(title) {
        return await this.putResource('/worksheets/saved', {type: title})
    }

    async saveManyAnketa(id = '', data,type) {
        console.log(id);
        let D = [];
        for (let i = 0; i < data.length; i++) {
            for (let j = 0; j < data[i].forms.length; j++) {
                if (data[i].forms[j].type == 1) {
                    let obj = {};
                    if (data[i].forms[j].answer) {
                        obj = {
                            form_id: data[i].forms[j].id,
                            type: data[i].forms[j].type,
                            answers: data[i].forms[j].answer.answers
                        };
                    } else {
                        obj = {
                            form_id: data[i].forms[j].id,
                            type: data[i].forms[j].type,
                            answers: null
                        };
                    }
                    D.push(obj);
                }
                if (data[i].forms[j].type == 2){
                    let obj = {};
                    obj = {
                        form_id: data[i].forms[j].id,
                        type: data[i].forms[j].type,
                        answers: null
                    };
                    let s = 1;
                    let ansObj = {};
                    for (let prop in data[i].forms[j].answers){
                        if (data[i].forms[j].answers[prop].checked){
                            console.log(data[i].forms[j].answers[prop]);
                            if (data[i].forms[j].answers[prop][prop] === "Другое:" && data[i].forms[j].answers[prop].data){
                                ansObj[s] = data[i].forms[j].answers[prop].data
                            }else{
                                ansObj[s] = data[i].forms[j].answers[prop][prop];
                            }
                        }
                        s++;
                        if (Object.keys(ansObj).length === 0){
                            obj.answers = null
                        }else{
                            obj.answers = ansObj;
                        }
                    }
                    // for (let prop in data[i].forms[j].answers){
                    //     if (data[i].forms[j].answers[prop].checked){
                    //         ansObj[s] = data[i].forms[j].answers[prop][prop];
                    //         console.log(ansObj)
                    //     }
                    //     s++;
                    //     if (Object.keys(ansObj).length === 0){
                    //         obj.answers = null
                    //     }else{
                    //         obj.answers = ansObj;
                    //     }
                    // }
                    ansObj = {};
                    s = 1;
                    D.push(obj);
                }
                if (data[i].forms[j].type == 4) {
                    let obj = {};
                    obj = {
                        form_id: data[i].forms[j].id,
                        type: data[i].forms[j].type,
                        answers: null
                    };
                    let s = 1;
                    let ansObj = {};
                    for (let prop in data[i].forms[j].answers){
                        if (data[i].forms[j].answers[prop].checked){
                            console.log(data[i].forms[j].answers[prop]);
                            if (data[i].forms[j].answers[prop][prop] === "Другое:" && data[i].forms[j].answers[prop].data){
                                ansObj[s] = data[i].forms[j].answers[prop].data
                            }else{
                                ansObj[s] = data[i].forms[j].answers[prop][prop];
                            }
                        }
                        s++;
                        if (Object.keys(ansObj).length === 0){
                            obj.answers = null
                        }else{
                            obj.answers = ansObj;
                        }
                    }
                    ansObj = {};
                    s = 1;
                    D.push(obj);
                }
            }
        }
        console.log('---------------');
        if (id && id.length>0){
            return await this.postResource(`/answers/many/${id}`,{data:D,section:type})
        }else{
            return await this.postResource(`/answers/many`,{data:D,section:type})
        }
    }

    async worksheetsAPI(title) {
        return await this.putResource('/worksheets/pending', {type: title});
    }

    async flyRocket() {
        return await this.putResource('/worksheets/submit');
    }

    async createFiles(id){
        return await this.getResource(`/docs/create-user-files/${id}`)
    }

    async changeProductionAPI(id, title) {
        const payload = {
            section: title,
            type: 1
        };
        return await this.putResource(`/productions/${id}`, payload)
    }

    async setComment(answer_id, text, section) {
        const payload = {
            answer_id,
            text,
            user_id: localStorage.getItem('user_id'),
            section
        };
        return await this.postResource(`/commentary`, payload)
    }

    async deleteCommentary(id) {
        return await axios.delete(`/commentary/${id}`)
    }

    async changeStatus(id, section, type) {
        const payload = {
            section,
            type
        };
        return await this.putResource(`/productions/${id}`, payload)
    }

    async savedAnketa(type){
        return await this.putResource(`/worksheets/saved`,{type})
    }
}