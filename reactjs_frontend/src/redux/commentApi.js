import axios from "axios";
import { toast } from "react-toastify"
import { createConfig } from "./cartApi";

const api = axios.create({
    baseURL: 'http://localhost:8080/api'
})

export const fetchComments = async (bookId) => {
    const res = await api.get(`/comments/${bookId}`, createConfig()).catch(error => toast.error(error.message));
    return res.data
}

export const postComment = async (payload) => {
    return await api.post(`/comments/${payload.bookId}/${payload.username}`, { comment: payload.comment }, createConfig())
        .then(res => { toast.success('Posted your comment.'); return res.data })
        .catch(error => toast.error(error.message));
}

export const deleteComment = async (commentId) => {
    return api.delete(`/comments/${commentId}`, createConfig()).then(res => toast.success('Delete your comment successfully.')).catch(error => toast.error(error.message));
}
