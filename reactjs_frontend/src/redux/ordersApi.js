import axios from "axios";
import { createConfig } from "./cartApi";
import { toast } from "react-toastify";

const api = axios.create({
    baseURL: 'http://localhost:8080/api'
})

export const fetchListOrders = async () => {
    const res = await api.get('/orders', createConfig()).then(res => res);
    return res.data;
}

export const placeOrder = async (order) => {
    api.post('/orders/new', order, createConfig()).then(res => toast.success('Thank you for your purchase.\nPlease check your order progress at the Orders tab.'))
        .catch(error => toast.error(error.message));
}

export const changeStatusOrder = async (order) => {
    api.put('/orders/update-status', order, createConfig()).then(res => toast.success('Update order status successfully.'))
        .catch(error => toast.error(error.message))
}

export const deleteOrder = async (orderId) => {
    api.delete(`/orders/delete/${orderId}`, createConfig()).then(res => toast.success('Delete order successfully.'))
        .catch(error => toast.error(error.message));
}

export const fetchUserOrders = async (username) => {
    const res = await api.get(`/orders/${username}`, createConfig()).then(res => res);
    return res.data;
}