import axios from "axios";
import { toast } from "react-toastify";

const api = axios.create({
    baseURL: 'http://localhost:8080/api'
})

const createConfig = () => {
    const token = sessionStorage.getItem('token');
    return {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    }
}

export const fetchComments = async (bookId) => {
    const res = await api.get(`/comments/${bookId}`, createConfig()).catch(error => toast.error(error.message));
    return res.data
}

export const postComment = async (username, bookId, comment) => {
    return await api.post(`/comments/${bookId}/${username}`, comment, createConfig())
        .then(res => { toast.success('Posted your comment.'); return res.data })
        .catch(error => toast.error(error.message));
}

export const deleteComment = async (commentId) => {
    return api.delete(`/comments/${commentId}`, createConfig()).then(res => toast.success('Delete your comment successfully.')).catch(error => toast.error(error.message));
}
