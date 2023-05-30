import axios from "axios";
import { toast } from "react-toastify";
import { createConfig } from "./cartApi";

const api = axios.create({
    baseURL: 'http://localhost:8080/api'
})

export const postRating = async (payload) => {
    await api.post(`/rating/${payload.bookId}/${payload.username}`, { vote: payload.vote }, createConfig()).then(res => toast.success('Thanks for your voting.'));
}

export const getRating = async (payload) => {
    const res = await api.get(`/rating/${payload.bookId}/${payload.username}`, createConfig());
    return res.data;
}