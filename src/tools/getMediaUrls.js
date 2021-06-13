import axios from "../plugins/axios";

export default function getMediaUrls(url) {
    console.log(url);
    return `${axios.defaults.baseURL.replace('/api','')}/${url}`
};