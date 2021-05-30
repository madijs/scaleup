import axios from "../plugins/axios";

export default function getMediaUrls(url) {
    return `${axios.defaults.baseURL.replace('/api','')}/${url}`
};